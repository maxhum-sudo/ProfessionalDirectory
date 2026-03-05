import { createServerSupabaseClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!

  if (!code) {
    return NextResponse.redirect(`${siteUrl}/auth/login?error=missing_code`)
  }

  const supabase = await createServerSupabaseClient()

  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    // Expired or invalid link
    return NextResponse.redirect(`${siteUrl}/auth/login?error=expired`)
  }

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.redirect(`${siteUrl}/auth/login`)
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('survey_completed')
    .eq('id', user.id)
    .single()

  if (profile?.survey_completed) {
    return NextResponse.redirect(`${siteUrl}/directory`)
  } else {
    return NextResponse.redirect(`${siteUrl}/survey`)
  }
}
