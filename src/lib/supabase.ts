// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'
import { useAuth } from '@clerk/nextjs'
import { useMemo } from 'react'

// For client-side usage
export function useSupabaseClient() {
  const { getToken } = useAuth()

  return useMemo(() => {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          fetch: async (url, options = {}) => {
            const clerkToken = await getToken({ template: 'supabase' })

            return fetch(url, {
              ...options,
              headers: {
                ...options.headers,
                Authorization: `Bearer ${clerkToken}`,
              },
            })
          },
        },
      }
    )
  }, [getToken])
}

// For server-side usage
export function createServerSupabaseClient(getToken: () => Promise<string | null>) {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        fetch: async (url, options = {}) => {
          const clerkToken = await getToken()

          return fetch(url, {
            ...options,
            headers: {
              ...options.headers,
              Authorization: `Bearer ${clerkToken}`,
            },
          })
        },
      },
    }
  )
}
