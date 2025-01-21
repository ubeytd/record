import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import type { SQSEvent } from "aws-lambda";
import fs from "fs";
import Groq from "groq-sdk";
import path from "path";
import { Resource } from "sst";
import { Readable } from "stream";
import { getS3QueueEvent } from "../utils";
import { db } from  "@workspace/db"
import { content } from  "@workspace/db/drizzle"
import { eq } from "drizzle-orm";
import { createGroq } from '@ai-sdk/groq';
import { generateObject, generateText } from 'ai';
import { z } from "zod";

const s3 = new S3Client({});

// Array of Groq API keys for rotation
const GROQ_API_KEYS = [
    process.env.GROQ_API_KEY,
    process.env.GROQ_API_KEY_II,
    process.env.GROQ_API_KEY_III
].filter(Boolean) as string[];

let currentKeyIndex = 0;

// Function to get next API key
const getNextGroqKey = () => {
    currentKeyIndex = (currentKeyIndex + 1) % GROQ_API_KEYS.length;
    return GROQ_API_KEYS[currentKeyIndex];
};

// Function to create Groq clients with current key
const createGroqClients = (apiKey: string) => {
    return {
        groq: new Groq({ apiKey }),
        groqAI: createGroq({ apiKey })
    };
};

// Initialize with first key
let { groq, groqAI } = createGroqClients(GROQ_API_KEYS[0]);

// Retry function for Groq operations
const retryWithKeyRotation = async <T>(operation: (clients: { groq: Groq, groqAI: ReturnType<typeof createGroq> }) => Promise<T>): Promise<T> => {
    const maxAttempts = GROQ_API_KEYS.length;
    let lastError: Error | null = null;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        try {
            return await operation({ groq, groqAI });
        } catch (err) {
            lastError = err instanceof Error ? err : new Error(String(err));
            console.log(`🔄 Rotating Groq API key after error: ${lastError.message}`);
            const newKey = getNextGroqKey();
            const clients = createGroqClients(newKey);
            groq = clients.groq;
            groqAI = clients.groqAI;
        }
    }

    throw new Error(`Failed after trying all API keys. Last error: ${lastError?.message}`);
};

export const handler = async (event: SQSEvent) => {
    try {
        const s3Event = getS3QueueEvent(event);
        if (!s3Event) {
            console.log("No S3 event found");
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "No S3 event found" })
            };
        }
        const key = s3Event.Records[0].s3.object.key;
        const folderPath = path.dirname(key);
        const id = key.split('/')[1]
        await db.update(content).set({
            status:"transcribing",
        }).where(eq(content.id, id))
        console.log(`🎯 Processing recording: ${key}`);

        // Get the file from S3
        const command = new GetObjectCommand({
            Key: key,
            Bucket: Resource.IngestBucket.name,
        });

        const response = await s3.send(command);
        if (!response.Body) {
            console.log("No body found");
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "No body found" })
            };
        }

        // Save to temp file
        const tmpFilePath = path.join('/tmp', `${Date.now()}.m4a`);
        const writeStream = fs.createWriteStream(tmpFilePath);
        const readStream = response.Body as Readable;

        await new Promise((resolve, reject) => {
            readStream.pipe(writeStream)
                .on('finish', resolve)
                .on('error', reject);
        });

        console.log('📝 Starting transcription...');
        const transcription = await retryWithKeyRotation(async ({ groq }) => {
            return await groq.audio.transcriptions.create({
                file: fs.createReadStream(tmpFilePath),
                model: "whisper-large-v3-turbo",
                response_format: "json",
                prompt: "This is a transcription of a meeting or conversation or self talk recording.",
                language: "tr",
                temperature: 0.0,
            });
        });

        // Clean up temp file
        fs.unlinkSync(tmpFilePath);

        // Format transcription into readable paragraphs
        console.log('📝 Formatting transcription into readable text...');
        const { text: formattedTranscription } = await retryWithKeyRotation(async ({ groqAI }) => {
            return await generateText({
                model: groqAI("llama-3.1-8b-instant"),
                messages: [
                    {
                        role: "system",
                        content: `You are an expert at making transcribed text more readable while preserving the exact speech patterns. Your task is to:

1. Format Rules:
   - Add paragraph breaks ONLY at natural speech pauses or topic changes
   - Keep all original words, fillers, and speech patterns exactly as they are
   - Preserve all numbers, technical terms, and specific details exactly
   - DO NOT add or remove any content
   - DO NOT change any wording
   - DO NOT add any interpretations or summaries
   - DO NOT add any markdown formatting except for paragraph breaks

2. When to Add Paragraph Breaks:
   - After complete thoughts
   - When switching to a new topic
   - At natural speaking pauses
   - Before transitional phrases like "However," "So," "But," etc.

3. Preserve Exactly:
   - All speech patterns (like "yeah," "like," "you know")
   - All technical terms and numbers
   - All repetitions and corrections
   - All informal language and conversational elements

Remember: Your ONLY job is to make the text more readable by adding paragraph breaks. DO NOT change anything else.`
                    },
                    {
                        role: "user",
                        content: transcription.text
                    }
                ]
            });
        });

        // Generate a descriptive title
        console.log('📌 Generating title...');
        const { object: titleObject } = await retryWithKeyRotation(async ({ groqAI }) => {
            return await generateObject({
                model: groqAI("llama-3.1-8b-instant"),
                prompt: `Generate a clear and descriptive title for this content. The title should:
1. Be 5-10 words
2. Capture the main topic or purpose
3. Be professional and clear
4. Include any key business terms or contexts mentioned

Text to analyze: ${formattedTranscription}

Output in JSON format with a 'title' field.`,
                schema: z.object({
                    title: z.string(),
                }),
                mode: "json",
                output: "object",
            });
        });

        const transcriptionKey = `${folderPath}/transcription.txt`;
        const transcriptionCommand = new PutObjectCommand({
            Key: transcriptionKey,
            Bucket: Resource.IngestBucket.name,
            Body: formattedTranscription,
            ContentType: "text/plain"
        });
        await s3.send(transcriptionCommand);
        await db.update(content).set({
            data: formattedTranscription,
            title: titleObject.title,
            status:"transcribed",
        }).where(eq(content.id, id))

        console.log('✅ Transcription complete:', transcription);
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Transcription complete",
                transcriptionKey
            })
        };

    } catch (error) {
        console.error('❌ Transcription error:', error);
        throw error;
    }
}
