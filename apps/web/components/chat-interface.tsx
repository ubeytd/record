'use client'

import { useState } from 'react'
import { Sheet, SheetContent } from "@workspace/ui/components/sheet"
import { Button } from "@workspace/ui/components/button"
import { ChevronLeft, Video, Plus, Mic } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"

interface Message {
  id: string
  text: string
  timestamp: string
  isSent: boolean
  isRead?: boolean
}

interface ChatInterfaceProps {
  isOpen: boolean
  onClose: () => void
}

export function ChatInterface({ isOpen, onClose }: ChatInterfaceProps) {
  const [messages] = useState<Message[]>([
    {
      id: '1',
      text: "Hey! How's the recording going?",
      timestamp: "23:55",
      isSent: true,
      isRead: true
    },
    {
      id: '2',
      text: "Just finished the first take!",
      timestamp: "23:56",
      isSent: false
    },
    {
      id: '3',
      text: "Sounds great! Can't wait to hear it",
      timestamp: "23:56",
      isSent: true,
      isRead: true
    }
  ])

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent 
        side="right" 
        className="w-full sm:w-[400px] p-0 bg-black border-l-0"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-xl border-b border-white/10">
          {/* Status Bar */}
          <div className="flex justify-between items-center px-4 py-1 text-xs text-white">
            <span className="tabular-nums">23:55</span>
            <div className="flex items-center gap-1">
              <span className="h-3 w-3 rounded-full border border-white/60"></span>
              <span className="h-3 w-3 rounded-full border border-white/60"></span>
              <span className="tabular-nums">16%</span>
            </div>
          </div>
          
          {/* Chat Header */}
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-[#007AFF] hover:text-[#0051FF] hover:bg-white/10"
                onClick={onClose}
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="ml-1">9</span>
              </Button>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-1">
                  <span className="text-white font-semibold">John Doe</span>
                  <span>❤️</span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-[#007AFF] hover:text-[#0051FF] hover:bg-white/10"
            >
              <Video className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex flex-col p-4 space-y-4 min-h-[calc(100vh-8rem)]">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isSent ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 
                ${message.isSent 
                  ? 'bg-[#007AFF] text-white' 
                  : 'bg-[#3A3A3C] text-white'}`}
              >
                <p className="text-[15px]">{message.text}</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-[10px] opacity-60">{message.timestamp}</span>
                  {message.isRead && (
                    <span className="text-[10px] opacity-60">Read</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="sticky bottom-0 bg-black/90 backdrop-blur-xl border-t border-white/10 p-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-[#007AFF] hover:text-[#0051FF] hover:bg-white/10"
            >
              <Plus className="h-5 w-5" />
            </Button>
            <div className="flex-1 rounded-full bg-[#1C1C1E] px-4 py-2 text-white/60">
              iMessage
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-[#007AFF] hover:text-[#0051FF] hover:bg-white/10"
            >
              <Mic className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

