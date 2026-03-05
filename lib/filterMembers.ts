import { Profile, Role } from '@/types'

export function filterMembers(
  members: Profile[],
  query: string,
  activeRole: Role | null,
  activeDomains: string[]
): Profile[] {
  return members.filter((m) => {
    // Role filter
    if (activeRole && m.role !== activeRole) return false

    // Domain filter (OR logic: member must have at least one active domain)
    if (activeDomains.length > 0) {
      const hasMatch = activeDomains.some((d) => m.domains.includes(d))
      if (!hasMatch) return false
    }

    // Text search (case-insensitive, partial match)
    if (query.trim()) {
      const q = query.toLowerCase()
      const searchable = [
        m.name,
        m.headline,
        m.offering,
        m.seeking,
        m.role,
        ...m.domains,
      ]
        .join(' ')
        .toLowerCase()
      if (!searchable.includes(q)) return false
    }

    return true
  })
}
