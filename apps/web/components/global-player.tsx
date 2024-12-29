'use client'

import { useEffect, useState } from 'react'
import { useAudio } from '@/contexts/audio-context'
import { Button } from '@workspace/ui/components/button'
import { Loader2, Pause, Play, X } from 'lucide-react'
import { Slider } from '@workspace/ui/components/slider'

interface GlobalPlayerProps {
  initialRecordingId?: string
  forceShow?: boolean
}

export function GlobalPlayer({ initialRecordingId, forceShow = false }: GlobalPlayerProps) {
  const { 
    currentRecording,
    isPlaying,
    currentTime,
    duration,
    pause,
    resume,
    seek,
    clearCurrentRecording,
    setCurrentRecordingById
  } = useAudio()

  const [progress, setProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    if (initialRecordingId && initialRecordingId !== currentRecording?.id) {
      setCurrentRecordingById(initialRecordingId)
    }
  }, [initialRecordingId, setCurrentRecordingById, currentRecording?.id])

  useEffect(() => {
    if (currentRecording && duration > 0 && !isDragging) {
      setProgress((currentTime / duration) * 100)
    }
  }, [currentTime, duration, currentRecording, isDragging])

  if (!currentRecording && !forceShow) return null

  const handlePlayPause = () => {
    if (isPlaying) {
      pause()
    } else if (currentRecording) {
      resume()
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/60 backdrop-blur-md border-t border-white/[0.06] shadow-2xl shadow-black/20">
      {/* Progress Bar */}
      <div className="max-w-3xl mx-auto">
        <div className="px-4 pt-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] tabular-nums text-white/40 w-10">
              {formatTime(currentTime)}
            </span>
            <Slider
              value={[progress]}
              max={100}
              step={0.1}
              className="flex-1"
              onValueChange={(value) => {
                if (value[0] !== undefined) {
                  setProgress(value[0])
                  if (duration) {
                    seek((value[0] / 100) * duration)
                  }
                }
              }}
              onValueCommit={() => setIsDragging(false)}
              onPointerDown={() => setIsDragging(true)}
            />
            <span className="text-[11px] tabular-nums text-white/40 w-10">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        <div className="flex items-center p-3 gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative w-10 h-10 text-white hover:text-white hover:bg-white/10 rounded-xl
              transition-all duration-200 hover:scale-105 active:scale-95"
            onClick={handlePlayPause}
            disabled={!currentRecording}
          >
            {!currentRecording ? (
              <Loader2 className="h-5 w-5 animate-spin text-white/40" />
            ) : isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5 ml-0.5" />
            )}
          </Button>

          <div className="flex-1 min-w-0">
            <h3 className="text-[15px] font-medium truncate text-white/90">
              {currentRecording ? currentRecording.title || 'Untitled Recording' : 'No recording selected'}
            </h3>
            <p className="text-[13px] text-white/40 truncate">
              {currentRecording ? formatTime(duration) : 'Select a recording to play'}
            </p>
          </div>

          {currentRecording && !forceShow && (
            <Button
              variant="ghost"
              size="icon"
              className="text-white/40 hover:text-white hover:bg-white/10 rounded-lg
                transition-all duration-200 hover:scale-105 active:scale-95"
              onClick={clearCurrentRecording}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

