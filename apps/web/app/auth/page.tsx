import { createClient } from '../lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AuthPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // If user is already authenticated, redirect to home
  if (user) {
    redirect('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or continue anonymously
          </p>
        </div>
      </div>
    </div>
  )
} 