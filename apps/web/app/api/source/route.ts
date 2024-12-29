import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest, NextResponse } from 'next/server';
import { Resource } from "sst";
const s3 = new S3Client({})
export async function GET(request: NextRequest) {

    const key = request.nextUrl.searchParams.get('key')
    if (!key) {
        return NextResponse.json({ error: 'Key is required' }, { status: 400 })
    }
    const command = new GetObjectCommand({
        Key: key,
        Bucket: Resource.IngestBucket.name,
    })
    const url =  await getSignedUrl(s3, command, {
      // 1 day in the future
        expiresIn: 60 * 60 * 24,
    })
    return NextResponse.redirect(url)
}