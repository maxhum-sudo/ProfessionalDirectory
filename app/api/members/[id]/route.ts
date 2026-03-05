import { createServerSupabaseClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: userId } = await params
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const currentUserId = user.id

  // Special case: return own profile even if in_directory = false
  const isOwnProfile = userId === currentUserId

  const { data: profile, error } = await supabase
    .from('profiles')
    .select(
      'id, name, headline, avatar_url, role, domains, offering, seeking, contact_link, in_directory, survey_completed, created_at, updated_at'
    )
    .eq('id', userId)
    .single()

  if (error || !profile) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  // Check visibility: must be in_directory and survey_completed (unless own profile)
  if (!isOwnProfile && (!profile.in_directory || !profile.survey_completed)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json(profile)
}
