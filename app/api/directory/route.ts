import { createServerSupabaseClient } from '@/lib/supabase-server'
import { NextRequest, NextResponse } from 'next/server'

export const revalidate = 60

export async function GET(request: NextRequest) {
  const supabase = await createServerSupabaseClient()

  // Verify session
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Query profiles where in_directory = true AND survey_completed = true
  const { data: members, error } = await supabase
    .from('profiles')
    .select(
      'id, name, headline, avatar_url, role, domains, offering, seeking, contact_link, created_at'
    )
    .eq('in_directory', true)
    .eq('survey_completed', true)
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching directory members:', error)
    return NextResponse.json(
      { error: 'Failed to fetch members' },
      { status: 500 }
    )
  }

  return NextResponse.json({ members: members || [] })
}
