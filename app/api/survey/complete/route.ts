import { createServerSupabaseClient } from '@/lib/supabase-server'
import { Role } from '@/types'
import { NextRequest, NextResponse } from 'next/server'

interface SurveyRequest {
  name: string
  headline: string
  role: Role
  domains: string[]
  offering: string
  seeking: string
  contact_link: string
  in_directory: boolean
  avatar_url: string | null
}

export async function POST(request: NextRequest) {
  try {
    const body: SurveyRequest = await request.json()

    // Validate all required fields
    const errors: Record<string, string> = {}

    if (!body.name?.trim()) {
      errors.name = 'Full name is required'
    } else if (body.name.length < 2 || body.name.length > 80) {
      errors.name = 'Full name must be 2–80 characters'
    }

    if (!body.headline?.trim()) {
      errors.headline = 'Headline is required'
    } else if (body.headline.length < 10 || body.headline.length > 100) {
      errors.headline = 'Headline must be 10–100 characters'
    }

    if (!body.role) {
      errors.role = 'Role is required'
    }

    if (!Array.isArray(body.domains) || body.domains.length === 0) {
      errors.domains = 'At least one domain is required'
    } else if (body.domains.length > 5) {
      errors.domains = 'Maximum 5 domains allowed'
    }

    if (!body.offering?.trim()) {
      errors.offering = 'Offering is required'
    } else if (body.offering.length < 10 || body.offering.length > 280) {
      errors.offering = 'Offering must be 10–280 characters'
    }

    if (!body.seeking?.trim()) {
      errors.seeking = 'Seeking is required'
    } else if (body.seeking.length < 10 || body.seeking.length > 280) {
      errors.seeking = 'Seeking must be 10–280 characters'
    }

    if (!body.contact_link?.trim()) {
      errors.contact_link = 'Contact link is required'
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (emailRegex.test(body.contact_link.trim())) {
        body.contact_link = `mailto:${body.contact_link.trim()}`
      } else if (
        !body.contact_link.startsWith('https://') &&
        !body.contact_link.startsWith('http://') &&
        !body.contact_link.startsWith('mailto:')
      ) {
        errors.contact_link = 'Please provide a valid URL or email address'
      }
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { error: 'Validation failed', fields: errors },
        { status: 400 }
      )
    }

    // Get session
    const supabase = await createServerSupabaseClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Upsert profile
    const { error: upsertError } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        email: user.email,
        name: body.name,
        headline: body.headline,
        role: body.role,
        domains: body.domains,
        offering: body.offering,
        seeking: body.seeking,
        contact_link: body.contact_link,
        in_directory: body.in_directory,
        avatar_url: body.avatar_url,
        survey_completed: true,
        updated_at: new Date().toISOString(),
      })

    if (upsertError) {
      console.error('Upsert error:', upsertError)
      return NextResponse.json(
        { error: 'Failed to create profile' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Survey complete error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
