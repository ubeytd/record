export default function FAQPage() {
  return (
    <div className="min-h-screen bg-black text-white/90 flex flex-col">
      {/* Translucent Header */}
      <header className="sticky top-0 z-10 backdrop-blur-sm border-b border-white/[0.06] bg-black/50">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-medium">Frequently Asked Questions</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="space-y-8">
            {/* Cost & Maintenance */}
            <div className="space-y-2">
              <h2 className="text-lg font-medium text-white/80">Is this tool free?</h2>
              <p className="text-white/60 leading-relaxed">
                Yes, this is a free tool. However, as a free service, there might be certain limitations and we cannot guarantee long-term maintenance.
              </p>
            </div>

            {/* Data Security */}
            <div className="space-y-2">
              <h2 className="text-lg font-medium text-white/80">How secure is my data?</h2>
              <p className="text-white/60 leading-relaxed">
                Your data is stored securely on encrypted storage. Recordings are streamed using temporary URLs (presigned) and are only accessible to authorized users.
              </p>
            </div>

            {/* AI Accuracy */}
            <div className="space-y-2">
              <h2 className="text-lg font-medium text-white/80">How accurate is the AI transcription?</h2>
              <p className="text-white/60 leading-relaxed">
                While we use Whisper 3 model via Groq for transcription, AI can make mistakes. We recommend always double-checking the transcriptions for critical information.
              </p>
            </div>

            {/* Limitations */}
            <div className="space-y-2">
              <h2 className="text-lg font-medium text-white/80">Are there any limitations?</h2>
              <p className="text-white/60 leading-relaxed">
                As this is a free tool, there might be certain limitations on usage. These could include restrictions on recording length, storage space, or processing time.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer with Disclaimer */}
      <footer className="border-t border-white/[0.06] bg-black/50 backdrop-blur-sm mt-auto">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="space-y-2">
            <h2 className="text-sm font-medium text-white/80">Disclaimer</h2>
            <p className="text-sm text-white/60 leading-relaxed">
              This is a free tool provided as-is without any warranties. While we strive to maintain the service and protect your data, 
              we cannot guarantee continuous availability or maintenance. The AI transcription service uses the Whisper 3 model via Groq 
              and may not be 100% accurate. Always verify important information manually.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
} 