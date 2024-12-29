'use client'

import { signInAnonymously, convertAnonymousUser } from '@/app/auth/actions'
import { createClient } from '@/app/lib/supabase/client'
import { useEffect, useState } from 'react'
import { AuthChangeEvent, Session } from '@supabase/supabase-js'

export function AnonymousAuth() {
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [showConversion, setShowConversion] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setIsAnonymous(user?.aud === 'authenticated' && !user?.email)
      } catch (error) {
        console.error('Error checking user:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        if (event === 'SIGNED_IN') {
          await checkUser()
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (isAnonymous && !showConversion) {
    return (
      <div className="flex flex-col gap-4">
        <p>You are currently using the app anonymously</p>
        <button
          onClick={() => setShowConversion(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Convert to Regular Account
        </button>
      </div>
    )
  }

  if (showConversion) {
    return (
      <form action={convertAnonymousUser} className="flex flex-col gap-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="border p-2 rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Convert Account
        </button>
      </form>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={() => signInAnonymously()}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Continue Anonymously
      </button>
    </div>
  )
} 