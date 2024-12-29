'use client'

import { updateEmail } from "@/app/auth/actions"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@workspace/ui/components/alert-dialog"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Bell } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export function NotificationSubscription() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    try {
      setIsLoading(true)
      await updateEmail(email)
      toast.success("Email updated successfully! Next time we will notify you when your summaries are ready.")
      setIsOpen(false)
    } catch (error: any) {
      console.error("Error updating email:", error)
      if (error.message?.includes('security purposes')) {
        toast.error("Please wait a moment before trying again")
      } else {
        toast.error("Failed to update email. Please try again later.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="text-white/40 hover:text-white hover:bg-white/10"
      >
        <Bell className="h-5 w-5" />
      </Button>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className="bg-[#1C1C1E]/95 border-white/[0.08] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Get Notified</AlertDialogTitle>
            <AlertDialogDescription className="text-white/60">
              Subscribe to receive notifications when your recordings are ready. You'll need to verify your email address.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
            />
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-white/10 text-white hover:bg-white/20"
              >
                {isLoading ? "Updating..." : "Subscribe"}
              </Button>
            </div>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
} 