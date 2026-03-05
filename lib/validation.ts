import { ROLES } from '@/types'

export const validateName = (name: string): string | null => {
  if (name.trim().length === 0) return 'Name is required'
  if (name.length > 100) return 'Name must be 100 characters or less'
  return null
}

export const validateHeadline = (headline: string): string | null => {
  if (headline.length > 150) return 'Headline must be 150 characters or less'
  return null
}

export const validateRole = (role: string): string | null => {
  if (!(ROLES as string[]).includes(role)) return 'Invalid role'
  return null
}

export const validateDomains = (domains: string[]): string | null => {
  if (!Array.isArray(domains)) return 'Domains must be an array'
  if (domains.length > 5) return 'Maximum 5 domains allowed'
  for (const domain of domains) {
    if (typeof domain !== 'string' || domain.trim().length === 0) {
      return 'Each domain must be a non-empty string'
    }
  }
  return null
}

export const validateOffering = (offering: string): string | null => {
  if (offering.length > 280) return 'Offering must be 280 characters or less'
  return null
}

export const validateSeeking = (seeking: string): string | null => {
  if (seeking.length > 280) return 'Seeking must be 280 characters or less'
  return null
}

export const validateContactLink = (contactLink: string): string | null => {
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

export const validateAvatarUrl = (avatarUrl: string): string | null => {
  if (avatarUrl.trim().length === 0) return 'Avatar URL must not be empty'
  try {
    new URL(avatarUrl)
    return null
  } catch {
    return 'Avatar URL must be a valid URL'
  }
}

export const normalizeContactLink = (contactLink: string): string => {
  const trimmed = contactLink.trim()
  if (trimmed.startsWith('mailto:')) return trimmed
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (emailRegex.test(trimmed)) {
    return `mailto:${trimmed}`
  }
  return trimmed
}
