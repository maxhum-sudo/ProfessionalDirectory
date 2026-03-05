import { describe, it, expect } from 'vitest'
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

describe('validateName', () => {
  it('accepts a valid name', () => {
    expect(validateName('Alice Smith')).toBeNull()
  })

  it('rejects empty name', () => {
    expect(validateName('')).toBe('Name is required')
  })

  it('rejects whitespace-only name', () => {
    expect(validateName('   ')).toBe('Name is required')
  })

  it('rejects name over 100 characters', () => {
    expect(validateName('a'.repeat(101))).toBe('Name must be 100 characters or less')
  })

  it('accepts name at exactly 100 characters', () => {
    expect(validateName('a'.repeat(100))).toBeNull()
  })
})

describe('validateHeadline', () => {
  it('accepts a valid headline', () => {
    expect(validateHeadline('Building cool things')).toBeNull()
  })

  it('accepts empty headline', () => {
    expect(validateHeadline('')).toBeNull()
  })

  it('rejects headline over 150 characters', () => {
    expect(validateHeadline('a'.repeat(151))).toBe('Headline must be 150 characters or less')
  })
})

describe('validateRole', () => {
  it('accepts valid roles', () => {
    expect(validateRole('Founder / Co-founder')).toBeNull()
    expect(validateRole('Software Developer / Engineer')).toBeNull()
    expect(validateRole('Other')).toBeNull()
  })

  it('rejects invalid role', () => {
    expect(validateRole('CEO')).toBe('Invalid role')
    expect(validateRole('')).toBe('Invalid role')
  })
})

describe('validateDomains', () => {
  it('accepts valid domains', () => {
    expect(validateDomains(['SaaS', 'AI / ML'])).toBeNull()
  })

  it('accepts up to 5 domains', () => {
    expect(validateDomains(['a', 'b', 'c', 'd', 'e'])).toBeNull()
  })

  it('rejects more than 5 domains', () => {
    expect(validateDomains(['a', 'b', 'c', 'd', 'e', 'f'])).toBe('Maximum 5 domains allowed')
  })

  it('rejects empty string domains', () => {
    expect(validateDomains(['SaaS', ''])).toBe('Each domain must be a non-empty string')
  })

  it('rejects whitespace-only domains', () => {
    expect(validateDomains(['   '])).toBe('Each domain must be a non-empty string')
  })
})

describe('validateOffering', () => {
  it('accepts valid offering', () => {
    expect(validateOffering('Mentorship for founders')).toBeNull()
  })

  it('rejects offering over 280 characters', () => {
    expect(validateOffering('a'.repeat(281))).toBe('Offering must be 280 characters or less')
  })
})

describe('validateSeeking', () => {
  it('accepts valid seeking', () => {
    expect(validateSeeking('Looking for co-founder')).toBeNull()
  })

  it('rejects seeking over 280 characters', () => {
    expect(validateSeeking('a'.repeat(281))).toBe('Seeking must be 280 characters or less')
  })
})

describe('validateContactLink', () => {
  it('accepts HTTPS URLs', () => {
    expect(validateContactLink('https://linkedin.com/in/alice')).toBeNull()
  })

  it('accepts HTTP URLs', () => {
    expect(validateContactLink('http://example.com')).toBeNull()
  })

  it('accepts mailto URLs', () => {
    expect(validateContactLink('mailto:alice@example.com')).toBeNull()
  })

  it('accepts bare email addresses', () => {
    expect(validateContactLink('alice@example.com')).toBeNull()
  })

  it('rejects empty contact link', () => {
    expect(validateContactLink('')).toBe('Contact link is required')
  })

  it('rejects whitespace-only', () => {
    expect(validateContactLink('   ')).toBe('Contact link is required')
  })

  it('rejects random text', () => {
    expect(validateContactLink('not a url')).toBe('Please provide a valid URL or email address')
  })
})

describe('validateAvatarUrl', () => {
  it('accepts valid URL', () => {
    expect(validateAvatarUrl('https://example.com/avatar.jpg')).toBeNull()
  })

  it('rejects empty string', () => {
    expect(validateAvatarUrl('')).toBe('Avatar URL must not be empty')
  })

  it('rejects invalid URL', () => {
    expect(validateAvatarUrl('not-a-url')).toBe('Avatar URL must be a valid URL')
  })
})

describe('normalizeContactLink', () => {
  it('prepends mailto: to email addresses', () => {
    expect(normalizeContactLink('alice@example.com')).toBe('mailto:alice@example.com')
  })

  it('trims whitespace before normalizing', () => {
    expect(normalizeContactLink('  alice@example.com  ')).toBe('mailto:alice@example.com')
  })

  it('leaves URLs untouched', () => {
    expect(normalizeContactLink('https://linkedin.com')).toBe('https://linkedin.com')
  })

  it('leaves mailto: links untouched', () => {
    expect(normalizeContactLink('mailto:alice@example.com')).toBe('mailto:alice@example.com')
  })
})
