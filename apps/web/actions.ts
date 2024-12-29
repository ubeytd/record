"use server"
import {
    DeleteObjectsCommand,
    ListObjectsV2Command,
    PutObjectCommand,
    S3Client
} from "@aws-sdk/client-s3";
import { db } from "@workspace/db";
import { content, source } from "@workspace/db/drizzle";
import { and, desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { Resource } from "sst";
import { createClient } from "./app/lib/supabase/server";

const s3 = new S3Client({});

export type Recording = {
    id: string;
    title: string | null;
    data: string | null;
    summary: string | null;
    status: 'processing' | 'transcribing' | 'summarized' | 'error' | null;
    createdAt: string | null;
    source: {
        id: string;
        createdAt: string | null;
        data: string | null;
        updatedAt: string | null;
        type: string | null;
        createdBy: string | null;
        contentId: string | null;
    } | null;
}

export const uploadRecording = async (data: string) => {
   try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      throw new Error("Unauthorized")
    }

    const userId = user.id
    const id = crypto.randomUUID()
    const key = `${userId}/${id}/recording.m4a`
    const [contentObject] = await db.insert(content).values({
        id,
        data:"",
        createdBy: userId
    }).returning()
     await db.insert(source).values({
        id: crypto.randomUUID(),
        type: "audio",
        contentId: contentObject?.id,
        data:key,
        createdBy: userId
    }).returning()
    const command = new PutObjectCommand({
        Key: key,
        Bucket: Resource.IngestBucket.name,
        Body: Buffer.from(data, 'base64'),
        ContentType: 'audio/mp4'
    });
    console.log(`✅ Recording uploaded to s3: ${key}`)
    await s3.send(command);
    await revalidatePath("/")
    return key
   } catch (error) {
    console.error('Upload error:', error);
    throw error
   }
}

export const getMyContent = async (): Promise<Recording[]> => {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
        return []
    }

    const userId = user.id
    const contents = await db.select({
        id: content.id,
        title: content.title,  
        data: source.data,
        summary: content.summary,
        status: content.status,
        createdAt: content.createdAt,
        source: source
    }).from(content)
    .leftJoin(source, eq(content.id, source.contentId))
    .where(
        and(
            eq(source.type, 'audio'),
            eq(content.createdBy, userId)
        )
    )
    .orderBy(desc(content.createdAt))
    return contents as Recording[]
}

export const getRecordingById = async (id: string): Promise<Recording | null> => {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
        return null
    }

    const userId = user.id
    const [recording] = await db.select({
        id: content.id,
        title: content.title,  
        data: content.data,
        summary: content.summary,
        status: content.status,
        createdAt: content.createdAt,
        source: source
    }).from(content)
    .leftJoin(source, eq(content.id, source.contentId))
    .where(
        and(
            eq(source.type, 'audio'),
            eq(content.id, id),
            eq(content.createdBy, userId)
        )
    )
    return recording as Recording | null
}

export const deleteRecording = async (id: string) => {
    try {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
            throw new Error("Unauthorized")
        }

        const userId = user.id

        // First get the recording to get the S3 key
        const [recording] = await db.select({
            source: source
        }).from(content)
        .leftJoin(source, eq(content.id, source.contentId))
        .where(
            and(
                eq(source.type, 'audio'),
                eq(content.id, id),
                eq(content.createdBy, userId)
            )
        )

        if (recording?.source?.data) {
            // Get the folder prefix from the recording key
            const folderPrefix = `${userId}/${id}/`

            // List all objects in the folder
            const listCommand = new ListObjectsV2Command({
                Bucket: Resource.IngestBucket.name,
                Prefix: folderPrefix
            });
            const listedObjects = await s3.send(listCommand);

            if (listedObjects.Contents && listedObjects.Contents.length > 0) {
                // Delete all objects in the folder
                const deleteCommand = new DeleteObjectsCommand({
                    Bucket: Resource.IngestBucket.name,
                    Delete: {
                        Objects: listedObjects.Contents.map(({ Key }) => ({ Key }))
                    }
                });
                await s3.send(deleteCommand);
            }
        }

        // Delete from database
        await db.delete(source).where(eq(source.contentId, id))
        await db.delete(content).where(eq(content.id, id))

        await revalidatePath("/")
        return true
    } catch (error) {
        console.error('Delete error:', error);
        throw error
    }
}