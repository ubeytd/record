import type { S3Event, SQSEvent } from "aws-lambda";

export function getS3QueueEvent(event: SQSEvent): S3Event | null {
    try {
        const [record] = event.Records;
        if (!record?.body) {
            console.log("No SQS record or body found");
            return null;
        }

        const s3Event = JSON.parse(record.body) as S3Event;
        if (!s3Event?.Records?.[0]) {
            console.log("No S3 event records found");
            return null;
        }

        return s3Event;
    } catch (error) {
        console.error("Error parsing S3 event from SQS:", error);
        return null;
    }
}

