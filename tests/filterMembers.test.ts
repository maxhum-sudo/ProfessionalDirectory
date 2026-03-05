import { describe, it, expect } from 'vitest'
import { filterMembers } from '@/lib/filterMembers'
import { Profile } from '@/types'

const makeProfile = (overrides: Partial<Profile> = {}): Profile => ({
  id: '1',
  name: 'Alice Smith',
  headline: 'Founder building SaaS tools',
  avatar_url: null,
  role: 'Founder / Co-founder',
  domains: ['SaaS', 'AI / ML'],
  offering: 'Mentorship for early-stage founders',
  seeking: 'A great technical co-founder',
  contact_link: 'https://linkedin.com/in/alice',
  in_directory: true,
  survey_completed: true,
  created_at: '2024-01-01',
  updated_at: '2024-01-01',
  ...overrides,
})

const members: Profile[] = [
  makeProfile({ id: '1', name: 'Alice Smith', role: 'Founder / Co-founder', domains: ['SaaS', 'AI / ML'] }),
  makeProfile({ id: '2', name: 'Bob Jones', role: 'Software Developer / Engineer', domains: ['AI / ML', 'B2B'], headline: 'Full-stack engineer', offering: 'Code reviews', seeking: 'Startup opportunities' }),
  makeProfile({ id: '3', name: 'Carol Lee', role: 'Designer (Product / Brand / UX)', domains: ['E-commerce', 'Consumer Apps'], headline: 'UX designer', offering: 'Design audits', seeking: 'Freelance projects' }),
  makeProfile({ id: '4', name: 'Dave Kim', role: 'Founder / Co-founder', domains: ['Fintech'], headline: 'Fintech founder', offering: 'Fundraising advice', seeking: 'Angel investors' }),
]

describe('filterMembers', () => {
  it('returns all members with no filters', () => {
    const result = filterMembers(members, '', null, [])
    expect(result).toHaveLength(4)
  })

  it('filters by role', () => {
    const result = filterMembers(members, '', 'Founder / Co-founder', [])
    expect(result).toHaveLength(2)
    expect(result.map((m) => m.name)).toEqual(['Alice Smith', 'Dave Kim'])
  })

  it('filters by domain with OR logic', () => {
    const result = filterMembers(members, '', null, ['AI / ML'])
    expect(result).toHaveLength(2)
    expect(result.map((m) => m.name)).toEqual(['Alice Smith', 'Bob Jones'])
  })

  it('filters by multiple domains (OR)', () => {
    const result = filterMembers(members, '', null, ['Fintech', 'E-commerce'])
    expect(result).toHaveLength(2)
    expect(result.map((m) => m.name)).toEqual(['Carol Lee', 'Dave Kim'])
  })

  it('filters by text search across name', () => {
    const result = filterMembers(members, 'alice', null, [])
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Alice Smith')
  })

  it('filters by text search across headline', () => {
    const result = filterMembers(members, 'fintech', null, [])
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Dave Kim')
  })

  it('filters by text search across offering', () => {
    const result = filterMembers(members, 'code reviews', null, [])
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Bob Jones')
  })

  it('filters by text search across seeking', () => {
    const result = filterMembers(members, 'angel investors', null, [])
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Dave Kim')
  })

  it('combines role + domain filters', () => {
    const result = filterMembers(members, '', 'Founder / Co-founder', ['SaaS'])
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Alice Smith')
  })

  it('combines role + text search', () => {
    const result = filterMembers(members, 'fundraising', 'Founder / Co-founder', [])
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Dave Kim')
  })

  it('combines all filters', () => {
    const result = filterMembers(members, 'mentorship', 'Founder / Co-founder', ['SaaS'])
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Alice Smith')
  })

  it('returns empty when no matches', () => {
    const result = filterMembers(members, 'nonexistent', null, [])
    expect(result).toHaveLength(0)
  })

  it('search is case-insensitive', () => {
    const result = filterMembers(members, 'ALICE', null, [])
    expect(result).toHaveLength(1)
  })

  it('ignores whitespace-only search', () => {
    const result = filterMembers(members, '   ', null, [])
    expect(result).toHaveLength(4)
  })
})
