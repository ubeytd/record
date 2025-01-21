import { createGroq } from '@ai-sdk/groq';
import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import { z } from "zod";
import { db } from "@workspace/db";
import { content } from "@workspace/db/drizzle";
import { generateObject, generateText } from 'ai';
import type { SQSEvent } from "aws-lambda";
import { eq } from "drizzle-orm";
import path from "path";
import { Resend } from 'resend';
import { Resource } from "sst";
import { getS3QueueEvent } from "../utils";

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

// Function to create Groq client with current key
const createGroqClient = (apiKey: string) => {
    return createGroq({ apiKey });
};

// Initialize with first key
let groqAI = createGroqClient(GROQ_API_KEYS[0]);

// Retry function for Groq operations
const retryWithKeyRotation = async <T>(operation: (client: ReturnType<typeof createGroq>) => Promise<T>): Promise<T> => {
    const maxAttempts = GROQ_API_KEYS.length;
    let lastError: Error | null = null;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        try {
            return await operation(groqAI);
        } catch (err) {
            lastError = err instanceof Error ? err : new Error(String(err));
            console.log(`🔄 Rotating Groq API key after error: ${lastError.message}`);
            const newKey = getNextGroqKey();
            groqAI = createGroqClient(newKey);
        }
    }

    throw new Error(`Failed after trying all API keys. Last error: ${lastError?.message}`);
};

const resend = new Resend(process.env.RESEND_API_KEY);

const s3 = new S3Client({});

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
        await db.update(content).set({
            status: "summarizing",
        }).where(eq(content.id, key.split('/')[1]))
        console.log(`🎯 Processing transcription: ${key}`);

        const command = new GetObjectCommand({
            Key: key,
            Bucket: Resource.IngestBucket.name,
            ResponseContentType: "text/plain",
        });

        const response = await s3.send(command);
        const textContent = await response.Body?.transformToString();
        if (!textContent) {
            console.log("No text content found");
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "No text content found" })
            };
        }

        console.log('📝 Generating summary...');
        const { text } = await retryWithKeyRotation(async (groqAI) => {
            return await generateText({
                model: groqAI("llama-3.1-8b-instant"),
                messages: [
                    {
                        role: "system",
                        content: `Instructions for Creating Comprehensive Audio Summaries
Dear AI Assistant,
When asked to summarize audio transcriptions, follow these detailed guidelines to create thorough, educational, and accessible summaries:
1. Initial Structure
Begin your summary with three main sections:
	•	Context Overview
	•	Detailed Analysis
	•	Technical Explanations
2. Context Overview
Start by establishing:
	•	Who is speaking
	•	Their roles/relationships
	•	The general topic
	•	The purpose of the conversation
	•	The setting/circumstances
3. Detailed Analysis
Break down the content into:
	•	Main themes
	•	Sub-topics
	•	Key decisions or conclusions
	•	Problems discussed
	•	Solutions proposed
4. Technical Explanations
For each technical term or industry-specific concept:
	•	Provide a clear definition
	•	Add an explanation in simple terms
	•	Include relevant examples where helpful
	•	Connect it to broader concepts
5. Formatting Guidelines
Structure your response with:
	•	Clear headings and subheadings
	•	Bullet points for lists
	•	Bold text for key terms
	•	Indented explanations for technical concepts
6. Special Attention Areas
Always include:
	•	💡 Knowledge Boxes: Brief explanations of complex terms
	•	🔑 Key Takeaways: Essential points from the discussion
	•	⚡ Action Items: Required next steps
	•	📌 Important Context: Background information needed to understand the topic
7. Example Format:
## Context
[Basic situation overview]

## Main Discussion Points
[Detailed breakdown of topics]

## Technical Terms Explained
💡 [Term]: [Simple definition]
   - In simple terms: [Layman's explanation]
   - Example: [Real-world example]

## Action Items
⚡ [List of required actions]

## Key Takeaways
🔑 [Essential points]`,
                    },
                    {
                        role: "user",
                        content: textContent
                    },
                ]
            });
        });

        console.log('📌 Generating title...');
        const { object } = await retryWithKeyRotation(async (groqAI) => {
            return await generateObject({
                model: groqAI("llama-3.1-8b-instant"),
                prompt: `Generate title for the following text. The title should be a single sentence that captures the essence of the text. It should be 10 words or less. Output in JSON format. ${text}`,
                schema: z.object({
                    title: z.string(),
                }),
                mode: "json",
                output: "object",
            });
        });

        const summaryKey = `${folderPath}/summary.txt`;
        const summaryCommand = new PutObjectCommand({
            Key: summaryKey,
            Bucket: Resource.IngestBucket.name,
            Body: text,
            ContentType: "text/plain"
        });
        const id = key?.split("/")[1]
        await db.update(content).set({
            title: object.title,
            summary: text,
            status: "summarized",
        }).where(eq(content.id, id))
        console.log(`🎯 Summary saved to database: ${id}`);
        await s3.send(summaryCommand);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Summary complete",
                summaryKey
            })
        };
    } catch (error) {
        console.error('❌ Summary error:', error);
        throw error;
    }
}
