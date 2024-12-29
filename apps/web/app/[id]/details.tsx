'use client'

import { getRecordingById } from '@/actions'
import { GlobalPlayer } from '@/components/global-player'
import { Button } from '@workspace/ui/components/button'
import { ChevronLeft, Copy, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { useAudio } from '@/contexts/audio-context'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type RecordingDetailsProps = {
  recording: NonNullable<Awaited<ReturnType<typeof getRecordingById>>>
  recordingId: string
}

export default function RecordingDetails({ recording: initialRecording, recordingId }: RecordingDetailsProps) {
  const router = useRouter()
  const { setCurrentRecordingById } = useAudio()
  const [recording] = useState(initialRecording)
  const [copiedMap, setCopiedMap] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (recordingId !== recording?.id) {
      setCurrentRecordingById(recordingId, recording)
    }
  }, [recordingId, recording, setCurrentRecordingById])

  const handleCopy = async (text: string, type: 'transcription' | 'summary') => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedMap(prev => ({ ...prev, [type]: true }))
      toast.success(`${type === 'transcription' ? 'Transcription' : 'Summary'} copied to clipboard`)
      setTimeout(() => {
        setCopiedMap(prev => ({ ...prev, [type]: false }))
      }, 2000)
    } catch {
      toast.error('Failed to copy to clipboard')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black/95 to-black/90 text-white pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-black/60 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 text-white/80 hover:text-white hover:bg-white/10 rounded-xl
                     transition-all duration-200 hover:scale-105 active:scale-95"
            onClick={() => router.back()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="min-w-0">
            <h1 className="text-base font-medium text-white/90 truncate">
              {recording.title || 'Untitled Recording'}
            </h1>
            <p className="text-xs text-white/40">
              {recording.createdAt ? new Date(recording.createdAt).toLocaleString() : 'Unknown date'}
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {recording.data && (
          <div className="relative group">
            <div className="absolute -inset-px bg-gradient-to-r from-white/[0.08] to-white/[0.05] rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-white/[0.04] hover:bg-white/[0.06] rounded-xl p-6 backdrop-blur-xl border border-white/[0.06] transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-white/90">Transcription</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white/40 hover:text-white hover:bg-white/10 rounded-lg
                           transition-all duration-200 hover:scale-105 active:scale-95"
                  onClick={() => handleCopy(recording.data!, 'transcription')}
                >
                  {copiedMap['transcription'] ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="prose prose-invert max-w-none prose-p:text-white/70 hover:prose-p:text-white/90 
                            prose-headings:text-white prose-strong:text-white/90 prose-a:text-blue-400
                            prose-p:transition-colors prose-p:duration-200">
                <ReactMarkdown>
                  {recording.data}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        )}
        
        {recording.summary && (
          <div className="relative group">
            <div className="absolute -inset-px bg-gradient-to-r from-white/[0.08] to-white/[0.05] rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-white/[0.04] hover:bg-white/[0.06] rounded-xl p-6 backdrop-blur-xl border border-white/[0.06] transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-white/90">Summary</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white/40 hover:text-white hover:bg-white/10 rounded-lg
                           transition-all duration-200 hover:scale-105 active:scale-95"
                  onClick={() => handleCopy(recording.summary!, 'summary')}
                >
                  {copiedMap['summary'] ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="prose prose-invert max-w-none prose-p:text-white/70 hover:prose-p:text-white/90 
                            prose-headings:text-white prose-strong:text-white/90 prose-a:text-blue-400
                            prose-p:transition-colors prose-p:duration-200">
                <ReactMarkdown>
                  {recording.summary}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        )}
      </main>

      <GlobalPlayer initialRecordingId={recordingId} forceShow={true} />
    </div>
  )
}

