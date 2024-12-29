'use client'

import { useState, useEffect, useCallback } from 'react'
import { Sheet, SheetContent } from "@workspace/ui/components/sheet"
import { AudioWave } from './audio-wave'
import { Button } from "@workspace/ui/components/button"
import { X, Mic } from 'lucide-react'
import { uploadRecording } from '@/actions'
import { createClient } from '@/app/lib/supabase/client'

interface RecordingSheetProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onComplete: (audioUrl: string, duration: number) => void
}

export function RecordingSheet({ isOpen, onOpenChange, onComplete }: RecordingSheetProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [duration, setDuration] = useState(0)
  const [title] = useState("New Recording")
  const [audioStream, setAudioStream] = useState<MediaStream>()
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>()
  const [audioChunks, setAudioChunks] = useState<Blob[]>([])
  const [isMiniRecorder, setIsMiniRecorder] = useState(false)
  const [progress, setProgress] = useState(0)
  const supabase = createClient()

  const startRecording = useCallback(async () => {
    try {
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        // Sign in anonymously if not authenticated
        const { error: authError } = await supabase.auth.signInAnonymously()
        if (authError) {
          console.error('Error signing in anonymously:', authError)
          onOpenChange(false)
          return
        }
      }

      // Now proceed with recording
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      setAudioStream(stream)
      
      const recorder = new MediaRecorder(stream, {
        mimeType: 'audio/mp4'  // Changed to mp4 to match the upload format
      })
      setMediaRecorder(recorder)
      
      const chunks: Blob[] = []
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data)
          setAudioChunks(prevChunks => [...prevChunks, e.data])
        }
      }
      
      setAudioChunks([])
      recorder.start(1000) // Collect data every second
      setIsRecording(true)
      setDuration(0)
      setProgress(0)
    } catch (err) {
      console.error('Error accessing microphone:', err)
      onOpenChange(false)
    }
  }, [onOpenChange, supabase.auth])

  useEffect(() => {
    if (isOpen && !isRecording) {
      startRecording()
    }
  }, [isOpen, isRecording, startRecording])

  useEffect(() => {
    if (!isRecording) return
    
    const interval = setInterval(() => {
      setDuration(prev => {
        const newDuration = prev + 100
        setProgress((newDuration / (5 * 60 * 1000)) * 100) // Assuming 5 minutes max recording time
        return newDuration
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isRecording])

  const stopRecording = async () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop()
      
      // Get the recorded chunks and create a blob
      const blob = new Blob(audioChunks, { type: 'audio/mp4' });
      
      try {
        // Convert blob to base64
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = async function() {
          const base64data = (reader.result as string).split(',')[1];
          
          // Upload the recording
          const key = await uploadRecording(base64data as string);
          
          // Create a temporary URL for local playback
          const url = URL.createObjectURL(blob);
          onComplete(url, duration / 1000);
        }
      } catch (error) {
        console.error('Error processing recording:', error);
      }
    }

    if (audioStream) {
      audioStream.getTracks().forEach(track => track.stop())
      setAudioStream(undefined)
    }
    
    setIsRecording(false)
    setIsMiniRecorder(false)
    setDuration(0)
    setProgress(0)
    onOpenChange(false)
  }

  const handleSheetOpenChange = (open: boolean) => {
    if (!open && isRecording) {
      setIsMiniRecorder(true)
    } else {
      setIsMiniRecorder(false)
    }
    onOpenChange(open)
  }

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    const centiseconds = Math.floor((ms % 1000) / 10)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')},${centiseconds.toString().padStart(2, '0')}`
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={handleSheetOpenChange}>
        <SheetContent 
          side="bottom" 
          className="bg-black text-white p-0 h-[350px] rounded-t-[20px] border-t border-white/10"
        >
          <div className="w-full h-1 bg-white/20 rounded-full mx-auto my-2 max-w-[48px]" />
          
          <div className="flex flex-col items-center justify-between h-[calc(100%-24px)] p-4">
            <h2 className="text-lg font-semibold text-white mb-2">{title}</h2>

            <div className="text-3xl font-medium text-white mb-4">
              {formatDuration(duration)}
            </div>

            <div className="w-full h-24 relative mb-6">
              <AudioWave 
                isRecording={isRecording}
                audioStream={audioStream}
                color="#FFFFFF"
              />
            </div>

            <Button 
              onClick={stopRecording}
              className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center mb-4 transition-transform hover:scale-105 active:scale-95"
              aria-label="Stop recording"
            >
              <div className="w-6 h-6 rounded-sm bg-black"></div>
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {isMiniRecorder && (
        <div 
          className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 text-white cursor-pointer"
          onClick={() => handleSheetOpenChange(true)}
        >
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/10">
            <div 
              className="h-full bg-white transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between p-3">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse mr-3"></div>
              <Mic className="w-5 h-5 mr-2 text-white/60" />
              <span className="font-medium text-sm">{formatDuration(duration)}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-white hover:bg-white/10 rounded-full"
              onClick={(e) => {
                e.stopPropagation()
                stopRecording()
              }}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

