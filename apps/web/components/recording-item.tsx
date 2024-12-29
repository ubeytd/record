'use client'

import { deleteRecording, getRecordingById, type Recording } from '@/actions'
import { useAudio } from '@/contexts/audio-context'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@workspace/ui/components/alert-dialog"
import { Button } from '@workspace/ui/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { Skeleton } from '@workspace/ui/components/skeleton'
import { Loader2, MoreHorizontal, Pause, Play, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface RecordingItemProps {
  content: Recording
  isSelected?: boolean
}

export function RecordingItem({ content, isSelected }: RecordingItemProps) {
  const { currentRecording, isPlaying, play, pause, clearCurrentRecording } = useAudio()
  const router = useRouter()
  const [status, setStatus] = useState(content.status)
  const [isPolling, setIsPolling] = useState(status !== 'summarized' && status !== 'error')
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const isLoading = !content.title
  const isCurrentRecording = currentRecording?.id === content.id

  useEffect(() => {
    let intervalId: NodeJS.Timer | null = null;

    const pollStatus = async () => {
      try {
        const recording = await getRecordingById(content.id)
        if (recording?.status === 'summarized' || recording?.status === 'error') {
          setStatus(recording.status)
          setIsPolling(false)
          if (intervalId) clearInterval(intervalId)
          if (recording.status === 'summarized') {
            router.refresh()
          }
        }
      } catch (error) {
        console.error('Error polling status:', error)
        setIsPolling(false)
        if (intervalId) clearInterval(intervalId)
      }
    }

    if (isPolling) {
      intervalId = setInterval(pollStatus, 1000)
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [isPolling, content.id, router])

  const handleClick = () => {
    if (isLoading) return
    router.push(`/${content.id}`)
  }

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isLoading) return
    if (isCurrentRecording && isPlaying) {
      pause()
    } else {
      play(content)
    }
  }

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isLoading) return
    setShowDeleteAlert(true)
  }

  const confirmDelete = async () => {
    try {
      await deleteRecording(content.id)
      if (isCurrentRecording) {
        clearCurrentRecording()
      }
      toast.success('Recording deleted successfully')
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Failed to delete recording')
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Unknown date'
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date)
  }

  const getStatusBadge = () => {
    if (!status) return null

    const statusColors = {
      processing: 'bg-blue-400/10 text-blue-400 ring-1 ring-blue-400/30',
      transcribing: 'bg-yellow-400/10 text-yellow-400 ring-1 ring-yellow-400/30',
      error: 'bg-red-400/10 text-red-400 ring-1 ring-red-400/30',
      summarized: 'bg-emerald-400/10 text-emerald-400 ring-1 ring-emerald-400/30',
    }

    const statusText = {
      processing: 'Processing',
      transcribing: 'Transcribing',
      error: 'Error',
      summarized: 'Ready',
    }

    return (
      <span 
        className={`inline-flex items-center px-2 py-0.5 text-[11px] font-medium rounded-full 
        ${statusColors[status as keyof typeof statusColors]}`}
      >
        {status === 'processing' && (
          <Loader2 className="w-3 h-3 mr-1 animate-spin" />
        )}
        {statusText[status as keyof typeof statusText]}
      </span>
    )
  }

  return (
    <>
      <div
        className={`group relative px-4 py-4 flex items-center justify-between transition-all duration-200
          border-b border-white/[0.03] hover:bg-gradient-to-r from-white/[0.05] to-white/[0.02]
          ${isLoading ? 'cursor-default bg-white/[0.02]' : 'cursor-pointer'}
          ${isSelected ? 'bg-white/[0.08]' : ''}`}
        onClick={handleClick}
      >
        <div className="flex items-center min-w-0">
          <div className="relative shrink-0 mr-4">
            <Button
              variant="ghost"
              size="icon"
              className={`relative w-10 h-10 text-white hover:text-white hover:bg-white/10 rounded-xl
                transition-all duration-300 hover:scale-110 active:scale-95 group-hover:shadow-lg group-hover:shadow-white/5
                ${isLoading ? 'bg-white/5 ring-1 ring-white/10' : ''}
                ${isCurrentRecording && isPlaying ? 'bg-white/15 ring-2 ring-white/20 shadow-xl shadow-white/10' : ''}`}
              onClick={handlePlayPause}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/[0.05] to-white/[0.02] animate-pulse"></div>
                  <Loader2 className="h-4 w-4 animate-spin text-white/60 relative z-10" />
                </div>
              ) : isCurrentRecording && isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4 ml-0.5" />
              )}
            </Button>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3">
              {isLoading ? (
                <div className="space-y-2.5 w-full">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-4 w-40 bg-white/[0.03]" />
                    <Skeleton className="h-5 w-20 bg-white/[0.03]" />
                  </div>
                  <Skeleton className="h-3 w-28 bg-white/[0.03]" />
                </div>
              ) : (
                <>
                  <div className="min-w-0 w-full">
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <h3 className="text-sm font-medium text-white truncate group-hover:text-white/90 transition-colors">
                        {content.title || 'Untitled Recording'}
                      </h3>
                      {getStatusBadge()}
                    </div>
                    <p className="text-xs text-white/40 group-hover:text-white/50 transition-colors">
                      {formatDate(content.createdAt)}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {!isLoading && (
          <div className="ml-4 shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white/40 hover:text-white hover:bg-white/10 opacity-0 group-hover:opacity-100 
                    transition-all duration-300 rounded-lg hover:scale-110 active:scale-95"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                sideOffset={8}
                className="w-56 bg-[#1C1C1E]/90 backdrop-blur-xl border-white/[0.08] text-white 
                         shadow-xl shadow-black/20 animate-in fade-in-0 zoom-in-95"
              >
                <DropdownMenuItem 
                  onClick={handleDelete} 
                  className="hover:bg-white/5 text-red-400 focus:bg-red-500/10 focus:text-red-400
                           transition-colors duration-200"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent className="bg-[#1C1C1E]/95 border-white/[0.08] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Recording</AlertDialogTitle>
            <AlertDialogDescription className="text-white/60">
              Are you sure you want to delete this recording? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              className="bg-white/5 text-white hover:bg-white/10 border-white/[0.08]"
              onClick={(e) => e.stopPropagation()}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500/90 text-white hover:bg-red-500"
              onClick={(e) => {
                e.stopPropagation()
                confirmDelete()
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

