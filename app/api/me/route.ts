import { createServerSupabaseClient } from '@/lib/supabase-server'
import {
  validateName,
  validateHeadline,
  validateRole,
  validateDomains,
  validateOffering,
  validateSeeking,
  validateContactLink,
  validateAvatarUrl,
  normalizeContactLink,
} from '@/lib/validation'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

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

  if (body.contact_link !== undefined) {
    body.contact_link = normalizeContactLink(body.contact_link)
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
