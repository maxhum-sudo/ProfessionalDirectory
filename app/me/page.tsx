import { getUser } from '@/lib/auth'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { Profile } from '@/types'
import { redirect } from 'next/navigation'
import { EditProfileClient } from './EditProfileClient'

export default async function EditProfilePage() {
  const user = await getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const supabase = await createServerSupabaseClient()
  const { data: profile } = await supabase
    .from('profiles')
    .select(
      'id, name, headline, avatar_url, role, domains, offering, seeking, contact_link, in_directory, survey_completed, created_at, updated_at'
    )
    .eq('id', user.id)
    .single()

  if (!profile) {
    redirect('/directory')
  }

  return <EditProfileClient profile={profile as Profile} />
}
