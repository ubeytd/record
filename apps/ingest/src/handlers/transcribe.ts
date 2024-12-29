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

const s3 = new S3Client({});
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

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
            title: "Untitled Recording",
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
        const transcription = await groq.audio.transcriptions.create({
            file: fs.createReadStream(tmpFilePath),
            model: "whisper-large-v3-turbo",
            response_format: "json",
            prompt: "This is a transcription of a meeting or conversation or self talk recording.",
            language: "tr",
            temperature: 0.0,
        });

        // Clean up temp file
        fs.unlinkSync(tmpFilePath);

        const transcriptionKey = `${folderPath}/transcription.txt`;
        const transcriptionCommand = new PutObjectCommand({
            Key: transcriptionKey,
            Bucket: Resource.IngestBucket.name,
            Body: transcription.text,
            ContentType: "text/plain"
        });
        await s3.send(transcriptionCommand);
        await db.update(content).set({
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
