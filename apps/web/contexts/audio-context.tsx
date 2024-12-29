'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { getRecordingById } from '@/actions'

type Recording = NonNullable<Awaited<ReturnType<typeof getRecordingById>>>

interface AudioContextType {
  currentRecording: Recording | null
  isPlaying: boolean
  currentTime: number
  duration: number
  play: (recording: Recording) => void
  pause: () => void
  resume: () => void
  seek: (time: number) => void
  clearCurrentRecording: () => void
  setCurrentRecordingById: (id: string, recording?: Recording) => void
}

const AudioContext = createContext<AudioContextType | null>(null)

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentRecording, setCurrentRecording] = useState<Recording | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    audioRef.current = new Audio()
    audioRef.current.addEventListener('timeupdate', () => {
      setCurrentTime(audioRef.current?.currentTime || 0)
    })
    audioRef.current.addEventListener('loadedmetadata', () => {
      setDuration(audioRef.current?.duration || 0)
    })
    audioRef.current.addEventListener('ended', () => {
      setIsPlaying(false)
      setCurrentTime(0)
    })

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
      }
    }
  }, [])

  const play = (recording: Recording) => {
    if (!audioRef.current) return
    setCurrentRecording(recording)
    const audioUrl = `/api/source?key=${recording.source?.data}`
    audioRef.current.src = audioUrl
    audioRef.current.play()
    setIsPlaying(true)
  }

  const pause = () => {
    if (!audioRef.current) return
    audioRef.current.pause()
    setIsPlaying(false)
  }

  const resume = () => {
    if (!audioRef.current) return
    audioRef.current.play()
    setIsPlaying(true)
  }

  const seek = (time: number) => {
    if (!audioRef.current) return
    audioRef.current.currentTime = time
    setCurrentTime(time)
  }

  const clearCurrentRecording = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ''
    }
    setCurrentRecording(null)
    setIsPlaying(false)
    setCurrentTime(0)
    setDuration(0)
  }

  const setCurrentRecordingById = async (id: string, recording?: Recording) => {
    if (recording) {
      setCurrentRecording(recording)
      if (audioRef.current) {
        const audioUrl = `/api/source?key=${recording.source?.data}`
        audioRef.current.src = audioUrl
        setDuration(audioRef.current.duration || 0)
      }
    } else {
      const fetchedRecording = await getRecordingById(id)
      if (fetchedRecording) {
        setCurrentRecording(fetchedRecording)
        if (audioRef.current) {
          const audioUrl = `/api/source?key=${fetchedRecording.source?.data}`
          audioRef.current.src = audioUrl
          setDuration(audioRef.current.duration || 0)
        }
      }
    }
  }

  const value = {
    currentRecording,
    isPlaying,
    currentTime,
    duration,
    play,
    pause,
    resume,
    seek,
    clearCurrentRecording,
    setCurrentRecordingById,
  }

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
}

