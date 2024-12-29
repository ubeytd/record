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
const groq = createGroq({
    apiKey: process.env.GROQ_API_KEY,
});


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

        const { text } = await generateText({
            model: groq("llama-3.1-8b-instant"),
            messages: [
                {
                    role: "system",
                    content: `Summarize the audio recording.Enrich and expand it. Provide a list of action items and key points.`,
                },
                {
                    role: "user",
                    content: textContent
                },
            ],
        });
        const { object } = await generateObject({
            model: groq("llama-3.1-8b-instant"),
            prompt: `Generate title for the following text. The title should be a single sentence that captures the essence of the text. It should be 10 words or less. Output in JSON format. ${text}`,
            schema: z.object({
                title: z.string(),
            }),
            mode: "json",
            output: "object",
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
            data: text,
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
