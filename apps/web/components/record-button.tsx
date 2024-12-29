'use client'

import { createClient } from '@/app/lib/supabase/client'
import { useState } from 'react'

export function RecordButton() {
  const [isRecording, setIsRecording] = useState(false)
  const supabase = createClient()

  const handleStartRecording = async () => {
    try {
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        // Sign in anonymously if not authenticated
        const { error,data } = await supabase.auth.signInAnonymously()
        console.log(data)
        if (error) {
          console.error('Error signing in anonymously:', error)
          return
        }
      }

      // Start recording logic here
      setIsRecording(true)
      // ... your recording logic
      
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleStopRecording = () => {
    setIsRecording(false)
    // ... your stop recording logic
  }

  return (
    <button
      onClick={isRecording ? handleStopRecording : handleStartRecording}
      className={`px-6 py-3 rounded-full font-medium transition-colors ${
        isRecording
          ? 'bg-red-500 hover:bg-red-600 text-white'
          : 'bg-blue-500 hover:bg-blue-600 text-white'
      }`}
    >
      {isRecording ? 'Stop Recording' : 'Start Recording'}
    </button>
  )
} 