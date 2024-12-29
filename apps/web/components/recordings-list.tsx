'use client'

import { getMyContent } from "@/actions"
import { RecordingSheet } from "@/components/recording-sheet"
import { NotificationSubscription } from "@/components/notification-subscription"
import { useAudio } from "@/contexts/audio-context"
import { createClient } from "@/lib/supabase/client"
import { Mic } from 'lucide-react'
import { useEffect, useState } from 'react'
import { RecordingItem } from "./recording-item"

interface RecordingsListProps {
  currentRecordingId?: string
  contents: Awaited<ReturnType<typeof getMyContent>>
}

export function RecordingsList({ currentRecordingId, contents }: RecordingsListProps) {
  const [isRecordingSheetOpen, setIsRecordingSheetOpen] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [canShowNotification, setCanShowNotification] = useState(false)
  const [isCheckingUser, setIsCheckingUser] = useState(true)
  const { currentRecording } = useAudio()
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        const isAnon = !user?.email && user?.aud === 'authenticated'
        setIsAnonymous(isAnon)

        if (isAnon && user?.created_at) {
          const createdAt = new Date(user.created_at)
          const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000)
          setCanShowNotification(createdAt < sixHoursAgo)
        }
      } catch (error) {
        console.error('Error checking user:', error)
      } finally {
        setIsCheckingUser(false)
      }
    }
    checkUser()
  }, [])

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
    <div className="flex flex-col min-h-screen bg-black">
      <header className="px-4 py-6 backdrop-blur-sm bg-black/10 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-medium text-white/90">Recordings</h1>
          {!isCheckingUser && isAnonymous && canShowNotification && <NotificationSubscription />}
        </div>
      </header>

      <div className="flex-1 relative">
        {contents?.length > 0 ? (
          <div className="w-full divide-y divide-white/[0.06]">
            {contents.map(content => (
              <RecordingItem 
                key={content.id} 
                content={content}
                isSelected={content.id === currentRecordingId}
              />
            ))}
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
            <div className="p-6 rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.03]">
              <div className="flex flex-col items-center">
                <Mic className="h-8 w-8 text-white/20 mb-4" strokeWidth={1.5} />
                <h2 className="text-lg font-normal text-white/60 mb-1.5">Start Recording</h2>
                <p className="text-white/40 text-center text-sm leading-relaxed max-w-[260px]">
                  Tap the record button below to create your first audio note
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {!currentRecording && !isRecording && (
        <div className="fixed bottom-0 left-0 right-0 p-6 flex justify-center items-center bg-gradient-to-t from-black via-black/90 to-transparent pb-8">
          <button 
            onClick={() => handleRecordingSheetOpenChange(true)}
            className="w-14 h-14 rounded-full bg-red-500/90 flex items-center justify-center 
                     transition-all duration-300 hover:scale-105 hover:bg-red-500
                     active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-400/30 focus:ring-offset-2 
                     focus:ring-offset-black"
            aria-label="Start recording"
          >
            <div className="w-5 h-5 rounded-full bg-white/95 shadow-inner"></div>
          </button>
        </div>
      )}

      <RecordingSheet 
        isOpen={isRecordingSheetOpen}
        onOpenChange={handleRecordingSheetOpenChange}
        onComplete={handleRecordingComplete}
      />
    </div>
  )
}

