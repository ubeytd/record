'use client'

import { signOut } from '@/app/auth/actions'
import { createClient } from '@/app/lib/supabase/client'
import { useEffect, useState } from 'react'
import { AuthChangeEvent, Session } from '@supabase/supabase-js'

export function UserMenu() {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setSession(session)
      } catch (error) {
        console.error('Error checking session:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        setSession(session)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  if (isLoading) {
    return null
  }

  if (!session) {
    return (
      <div className="flex items-center gap-4">
        <a href="/auth" className="text-sm text-blue-500 hover:text-blue-600">
          Sign In
        </a>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4">
      {session.user.email && (
        <span className="text-sm text-gray-500">{session.user.email}</span>
      )}
      <button
        onClick={() => signOut()}
        className="text-sm text-gray-500 hover:text-gray-600"
      >
        Sign Out
      </button>
    </div>
  )
} 