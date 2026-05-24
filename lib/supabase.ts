import { createClient } from '@supabase/supabase-js'

export const createSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  })
}

// Browser client - only created in browser
export const getSupabaseClient = () => {
  if (typeof window === 'undefined') {
    throw new Error('Supabase client should only be used in the browser')
  }
  return createSupabaseClient()
}

let client: ReturnType<typeof createSupabaseClient> | null = null

export const supabase = (() => {
  if (typeof window !== 'undefined') {
    if (!client) {
      client = createSupabaseClient()
    }
    return client
  }
  return null
}) as any

export default supabase
