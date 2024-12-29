'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

export async function signInAnonymously() {
  const cookieStore = cookies()
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInAnonymously()

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function convertAnonymousUser(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // First update the user with email
  const { error: updateError } = await supabase.auth.updateUser({ 
    email 
  })

  if (updateError) {
    return { error: updateError.message }
  }

  // After email verification, update password
  const { error: passwordError } = await supabase.auth.updateUser({ 
    password 
  })

  if (passwordError) {
    return { error: passwordError.message }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signIn(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signUp(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/verify')
}

export async function signOut() {
  const cookieStore = cookies()
  const supabase = createClient()

  await supabase.auth.signOut()
  redirect('/auth')
}

export async function updateEmail(email: string) {

  const supabase = createClient()

  const { error } = await supabase.auth.updateUser({
    email: email,
  })

  if (error) {
    throw error
  }
} 