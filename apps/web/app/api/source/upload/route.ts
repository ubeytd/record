import { createClient } from '@/app/lib/supabase/server';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { db } from "@workspace/db";
import { content, source } from "@workspace/db/drizzle";
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { Resource } from "sst";

const s3 = new S3Client({
    requestHandler: {
        requestTimeout: 20 * 60 * 1000 // 20 minutes
    }
})

export async function GET() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
        throw new Error("Unauthorized")
    }

    // Create content and source records first
    const id = crypto.randomUUID()
    const [contentObject] = await db.insert(content).values({
        id,
        data: "",
        createdBy: user.id
    }).returning()

    const fileName = `recording.m4a`
    const key = `${user.id}/${id}/${fileName}`

    await db.insert(source).values({
        id: crypto.randomUUID(),
        type: "audio",
        contentId: contentObject?.id,
        data: key,
        createdBy: user.id
    })

    // Generate presigned URL with the same key format
    const command = new PutObjectCommand({
        Key: key,
         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        Bucket: Resource.IngestBucket.name,
        ContentType: 'audio/mp4'
    })
    
    const url = await getSignedUrl(s3, command, {
        expiresIn: 20 * 60 // 20 minutes
    })
    revalidatePath("/")
    return NextResponse.json({ 
        url,
        key,
        id
    })
}
