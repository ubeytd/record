/// <reference path="./.sst/platform/config.d.ts" />

export default $config({

  app(input) {
    return {
      name: "somestuff",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",

    };
  },
  async run() {
    const transcribeQueue = new sst.aws.Queue("TranscribeQueue");
    const summarizeQueue = new sst.aws.Queue("SummarizeQueue");
    const bucket = new sst.aws.Bucket("IngestBucket");
    bucket.notify({
      notifications: [
        {
          name: "TranscribeQueue",
          queue: transcribeQueue,
          events: ["s3:ObjectCreated:*"],
          filterPrefix: "",
          filterSuffix: "/recording.m4a"
        },
        {
          name: "SummarizeQueue",
          queue: summarizeQueue,
          events: ["s3:ObjectCreated:*"],
          filterPrefix: "",
          filterSuffix: "/transcription.txt"
        },
      ],
    });
    transcribeQueue.subscribe({
      handler: "apps/ingest/src/handlers/transcribe.handler",
      link: [bucket],
      environment: {
        GROQ_API_KEY: process.env.GROQ_API_KEY || "",
        GROQ_API_KEY_II: process.env.GROQ_API_KEY_II || "",
        GROQ_API_KEY_III: process.env.GROQ_API_KEY_III || "",
        DATABASE_URL: process.env.DATABASE_URL || "",
      }
    });
    summarizeQueue.subscribe({
      handler: "apps/ingest/src/handlers/summarize.handler",
      link: [bucket],
      environment: {
        GROQ_API_KEY: process.env.GROQ_API_KEY || "",
        GROQ_API_KEY_II: process.env.GROQ_API_KEY_II || "",
        GROQ_API_KEY_III: process.env.GROQ_API_KEY_III || "",
        RESEND_API_KEY: process.env.RESEND_API_KEY || "",
        DATABASE_URL: process.env.DATABASE_URL || "",
      }
    });
    const app = new sst.aws.Nextjs("WebApp", {
      domain: "record.somestuff.lol",
      path: "apps/web",
      link: [bucket],
      server: {
        architecture: "x86_64",
        memory: "2048 MB",
      },
      environment: {
        DATABASE_URL: process.env.DATABASE_URL || "",
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
      },
      dev: {
        command: "bun dev",
        directory: "apps/web",
      }
      
    });
    return {
      appUrl: app.url,
    }
  },
});
