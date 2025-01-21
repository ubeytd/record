'use client'

import { getMyContent } from "@/actions"
import { RecordingSheet } from "@/components/recording-sheet"
import { useAudio } from "@/contexts/audio-context"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@workspace/ui/lib/utils"
import { Upload } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from "sonner"
import { RecordingItem } from "./recording-item"
import { useRouter } from 'next/navigation'

interface RecordingsListProps {
  currentRecordingId?: string
  contents: Awaited<ReturnType<typeof getMyContent>>
}

export function RecordingsList({ currentRecordingId, contents }: RecordingsListProps) {
  const [isRecordingSheetOpen, setIsRecordingSheetOpen] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const { currentRecording } = useAudio()
  const supabase = createClient()
  const router = useRouter()

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    if (!file.type.includes('audio')) {
      toast.error('Please upload an audio file')
      return
    }

    // Convert to m4a if needed
    if (!file.name.endsWith('.m4a')) {
      toast.error('Please upload an M4A file')
      return
    }

    setIsUploading(true)
    setUploadProgress(0)
    try {
      // Check if user exists, if not sign in anonymously
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        const { error: authError } = await supabase.auth.signInAnonymously()
        if (authError) {
          throw new Error('Failed to sign in')
        }
      }
   
      const response = await fetch('/api/source/upload')
      const { url, id } = await response.json()

      // Use XMLHttpRequest for upload progress
      await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const progress = (event.loaded / event.total) * 100
            setUploadProgress(progress)
          }
        }

        xhr.onload = () => {
          if (xhr.status === 200) {
            resolve(xhr.response)
          } else {
            reject(new Error('Upload failed'))
          }
        }

        xhr.onerror = () => reject(new Error('Upload failed'))

        xhr.open('PUT', url)
        xhr.setRequestHeader('Content-Type', 'audio/mp4')
        xhr.send(file)
      })

      toast.success('File uploaded successfully')
      router.refresh()
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Upload failed')
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }, [supabase.auth, router])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/x-m4a': ['.m4a'],
      'audio/mp4': ['.m4a']
    },
    maxFiles: 1,
    disabled: isUploading
  })

  const handleRecordingComplete = () => {
    // Handle recording complete
  }

  const handleRecordingSheetOpenChange = async (open: boolean) => {
    setIsRecordingSheetOpen(open)
    if (open) {
      setIsRecording(true)
    }
  }

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gradient-to-b from-black to-black/95">
      {/* Main content area with grid layout */}
      <main className="flex-1 overflow-hidden px-4 md:px-6 pb-32">
        <div className="h-full grid grid-rows-[1fr,auto] gap-6">
          {/* Scrollable Recordings List */}
          <div className="overflow-y-auto">
            {contents?.length > 0 && (
              <div className="space-y-1">
                {contents.map((content) => (
                  <RecordingItem
                    key={content.id}
                    content={content}
                    isSelected={content.id === currentRecordingId}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Fixed-height Upload Area */}
          <div className="h-[200px] shrink-0">
            <div
              {...getRootProps()}
              className={cn(
                'group relative h-full',
                'rounded-2xl border-2 border-dashed',
                'transition-all duration-300 ease-in-out',
                isDragActive 
                  ? 'border-white/30 bg-white/[0.03] scale-[1.02]' 
                  : 'border-white/10 hover:border-white/20 hover:bg-white/[0.02]',
                isUploading 
                  ? 'cursor-wait' 
                  : 'cursor-pointer'
              )}
            >
              <div className={cn(
                "absolute inset-0 flex flex-col items-center justify-center",
                isUploading && "backdrop-blur-sm"
              )}>
                <input {...getInputProps()} />
                
                {isUploading ? (
                  // Upload Progress UI
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full border-2 border-white/10" />
                      <svg
                        className="absolute inset-0 -rotate-90 transform"
                        viewBox="0 0 100 100"
                      >
                        <circle
                          className="text-white/5"
                          strokeWidth="4"
                          stroke="currentColor"
                          fill="transparent"
                          r="48"
                          cx="50"
                          cy="50"
                        />
                        <circle
                          className="text-white transition-all duration-300 ease-in-out"
                          strokeWidth="4"
                          strokeDasharray={300}
                          strokeDashoffset={300 - (uploadProgress / 100) * 300}
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="transparent"
                          r="48"
                          cx="50"
                          cy="50"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-medium text-white/80">
                          {Math.round(uploadProgress)}%
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1 text-center">
                      <p className="text-sm font-medium text-white/80">
                        Uploading...
                      </p>
                      <p className="text-xs text-white/40">
                        Please wait while we process your file
                      </p>
                    </div>
                  </div>
                ) : (
                  // Default Upload UI
                  <>
                    <div className={cn(
                      "p-4 rounded-full bg-white/5 transition-all duration-300",
                      "group-hover:bg-white/10 group-hover:scale-110",
                      isDragActive && "scale-125 bg-white/15"
                    )}>
                      <Upload 
                        className={cn(
                          "w-6 h-6 transition-colors duration-300",
                          isDragActive ? "text-white" : "text-white/60 group-hover:text-white/80"
                        )} 
                      />
                    </div>
                    <div className="mt-4 space-y-2 text-center">
                      <p className={cn(
                        "text-sm transition-colors duration-300",
                        isDragActive 
                          ? "text-white font-medium" 
                          : "text-white/60 group-hover:text-white/80"
                      )}>
                        {isDragActive 
                          ? "Drop to upload your audio" 
                          : "Drop audio file here or click to upload"
                        }
                      </p>
                      <p className="text-xs text-white/40 group-hover:text-white/50 transition-colors duration-300">
                        M4A files only
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Recording Button */}
      {!currentRecording && !isRecording && (
        <div 
          className="fixed bottom-0 left-0 right-0 h-28 
                     bg-gradient-to-t from-black via-black/95 to-transparent
                     flex items-center justify-center"
        >
          <button 
            onClick={() => handleRecordingSheetOpenChange(true)}
            className={cn(
              "w-16 h-16 rounded-full",
              "bg-red-500/90 hover:bg-red-500",
              "flex items-center justify-center",
              "transition-all duration-300",
              "hover:scale-110 active:scale-95",
              "focus:outline-none focus:ring-2 focus:ring-red-400/30",
              "focus:ring-offset-4 focus:ring-offset-black",
              "shadow-lg shadow-red-500/20"
            )}
            aria-label="Start recording"
          >
            <div className="w-6 h-6 rounded-full bg-white/95 shadow-inner" />
          </button>
        </div>
      )}

      {/* Recording Sheet */}
      <RecordingSheet 
        isOpen={isRecordingSheetOpen}
        onOpenChange={handleRecordingSheetOpenChange}
        onComplete={handleRecordingComplete}
      />
    </div>
  )
}

