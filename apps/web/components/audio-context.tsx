'use client'

import { createContext, useContext, useState, useRef, useEffect } from 'react'
import type { Recording } from '@/types/recording'

interface AudioContextType {
  currentRecording: Recording | null
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  play: (recording: Recording) => void
  pause: () => void
  resume: () => void
  seek: (time: number) => void
  setVolume: (volume: number) => void
  clearCurrentRecording: () => void
  setCurrentRecordingById: (id: string) => Promise<Recording | null>
  updateRecording: (updatedRecording: Recording) => void
}

const AudioContext = createContext<AudioContextType | null>(null)

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentRecording, setCurrentRecording] = useState<Recording | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [recordings, setRecordings] = useState<Recording[]>([])

  useEffect(() => {
    // Simulating fetching recordings from an API
    const fetchRecordings = async () => {
      // In a real app, this would be an API call
      const mockRecordings: Recording[] = [
        {
          id: '1',
          title: 'First Recording',
          timestamp: '2023-05-01 10:00',
          duration: 120,
          audioUrl: '/path/to/audio1.mp3'
        },
        {
          id: '2',
          title: 'Second Recording',
          timestamp: '2023-05-02 14:30',
          duration: 180,
          audioUrl: '/path/to/audio2.mp3'
        },
      ]
      setRecordings(mockRecordings)
    }

    fetchRecordings()
  }, [])

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
    }

    const audio = audioRef.current

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleDurationChange = () => setDuration(audio.duration)
    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('durationchange', handleDurationChange)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('durationchange', handleDurationChange)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  const play = (recording: Recording) => {
    if (audioRef.current) {
      if (currentRecording?.id !== recording.id) {
        audioRef.current.src = recording.audioUrl
        setCurrentRecording(recording)
      }
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const resume = () => {
    if (audioRef.current) {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const handleVolumeChange = (value: number) => {
    if (audioRef.current) {
      audioRef.current.volume = value
      setVolume(value)
    }
  }

  const clearCurrentRecording = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    setCurrentRecording(null)
    setIsPlaying(false)
    setCurrentTime(0)
  }

  const setCurrentRecordingById = async (id: string): Promise<Recording | null> => {
    const recording = recordings.find(rec => rec.id === id)
    if (recording) {
      setCurrentRecording(recording)
      return recording
    }
    return null
  }

  const updateRecording = (updatedRecording: Recording) => {
    setRecordings(prevRecordings => 
      prevRecordings.map(rec => 
        rec.id === updatedRecording.id ? updatedRecording : rec
      )
    )
    if (currentRecording?.id === updatedRecording.id) {
      setCurrentRecording(updatedRecording)
    }
  }

  return (
    <AudioContext.Provider
      value={{
        currentRecording,
        isPlaying,
        currentTime,
        duration,
        volume,
        play,
        pause,
        resume,
        seek,
        setVolume: handleVolumeChange,
        clearCurrentRecording,
        setCurrentRecordingById,
        updateRecording
      }}
    >
      {children}
    </AudioContext.Provider>
  )
}

export const useAudio = () => {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
}

