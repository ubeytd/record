"use client"

import { AudioProvider } from '@/contexts/audio-context'
import { Toaster } from 'sonner'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AudioProvider>
      {children}
      <Toaster />
    </AudioProvider>
  )
}
