import { createServerSupabaseClient } from './supabase-server'

export const getUser = async () => {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}
