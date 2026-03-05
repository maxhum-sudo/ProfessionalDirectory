import { createServerSupabaseClient } from '@/lib/supabase-server'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

// Validation rules for updatable fields
const validateName = (name: string): string | null => {
  if (name.trim().length === 0) return 'Name is required'
  if (name.length > 100) return 'Name must be 100 characters or less'
  return null
}

const validateHeadline = (headline: string): string | null => {
  if (headline.length > 150) return 'Headline must be 150 characters or less'
  return null
}

const validateRole = (role: string): string | null => {
  const validRoles = [
    'Founder / Co-founder',
    'Operator / Executive',
    'Software Developer / Engineer',
    'Designer (Product / Brand / UX)',
    'Marketer / Growth',
    'Consultant / Advisor',
    'Investor / Angel',
    'Freelancer / Contractor',
    'Researcher / Analyst',
    'Educator / Coach',
    'Other',
  ]
  if (!validRoles.includes(role)) return 'Invalid role'
  return null
}

const validateDomains = (domains: string[]): string | null => {
  if (!Array.isArray(domains)) return 'Domains must be an array'
  if (domains.length > 5) return 'Maximum 5 domains allowed'
  for (const domain of domains) {
    if (typeof domain !== 'string' || domain.trim().length === 0) {
      return 'Each domain must be a non-empty string'
    }
  }
  return null
}

const validateOffering = (offering: string): string | null => {
  if (offering.length > 280) return 'Offering must be 280 characters or less'
  return null
}

const validateSeeking = (seeking: string): string | null => {
  if (seeking.length > 280) return 'Seeking must be 280 characters or less'
  return null
}

const validateContactLink = (contactLink: string): string | null => {
  if (contactLink.trim().length === 0) return 'Contact link is required'
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (emailRegex.test(contactLink.trim())) return null
  try {
    new URL(contactLink)
    return null
  } catch {
    return 'Please provide a valid URL or email address'
  }
}

const validateAvatarUrl = (avatarUrl: string): string | null => {
  if (avatarUrl.trim().length === 0) return 'Avatar URL must not be empty'
  try {
    new URL(avatarUrl)
    return null
  } catch {
    return 'Avatar URL must be a valid URL'
  }
}

export async function PATCH(request: Request) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userId = user.id
  const body = await request.json()

  // Only allow updating these fields
  const allowedFields = [
    'name',
    'headline',
    'role',
    'domains',
    'offering',
    'seeking',
    'contact_link',
    'avatar_url',
    'in_directory',
  ]

  // Check for disallowed fields
  const providedFields = Object.keys(body)
  const disallowedFields = providedFields.filter(
    (field) => !allowedFields.includes(field)
  )
  if (disallowedFields.length > 0) {
    return NextResponse.json(
      { error: `Cannot update fields: ${disallowedFields.join(', ')}` },
      { status: 400 }
    )
  }

  // Validate provided fields
  const validationErrors: Record<string, string> = {}

  if (body.name !== undefined) {
    const nameError = validateName(body.name)
    if (nameError) validationErrors.name = nameError
  }

  if (body.headline !== undefined) {
    const headlineError = validateHeadline(body.headline)
    if (headlineError) validationErrors.headline = headlineError
  }

  if (body.role !== undefined) {
    const roleError = validateRole(body.role)
    if (roleError) validationErrors.role = roleError
  }

  if (body.domains !== undefined) {
    const domainsError = validateDomains(body.domains)
    if (domainsError) validationErrors.domains = domainsError
  }

  if (body.offering !== undefined) {
    const offeringError = validateOffering(body.offering)
    if (offeringError) validationErrors.offering = offeringError
  }

  if (body.seeking !== undefined) {
    const seekingError = validateSeeking(body.seeking)
    if (seekingError) validationErrors.seeking = seekingError
  }

  if (body.contact_link !== undefined) {
    const contactLinkError = validateContactLink(body.contact_link)
    if (contactLinkError) validationErrors.contact_link = contactLinkError
  }

  if (body.avatar_url !== undefined) {
    const avatarUrlError = validateAvatarUrl(body.avatar_url)
    if (avatarUrlError) validationErrors.avatar_url = avatarUrlError
  }

  if (body.in_directory !== undefined && typeof body.in_directory !== 'boolean') {
    validationErrors.in_directory = 'Must be a boolean'
  }

  if (Object.keys(validationErrors).length > 0) {
    return NextResponse.json(
      { error: 'Validation failed', errors: validationErrors },
      { status: 400 }
    )
  }

  // Normalize email contact links
  if (body.contact_link !== undefined) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (emailRegex.test(body.contact_link.trim())) {
      body.contact_link = `mailto:${body.contact_link.trim()}`
    }
  }

  // Build update object - only include provided fields
  const updateData: Record<string, any> = {}
  for (const field of allowedFields) {
    if (body[field] !== undefined) {
      updateData[field] = body[field]
    }
  }

  // Update profile
  const { data: updatedProfile, error: updateError } = await supabase
    .from('profiles')
    .update(updateData)
    .eq('id', userId)
    .select()
    .single()

  if (updateError) {
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    )
  }

  // Revalidate directory cache
  revalidatePath('/api/directory')

  return NextResponse.json({ success: true, profile: updatedProfile })
}
