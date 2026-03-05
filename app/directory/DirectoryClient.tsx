'use client'

import { DomainFilter } from '@/components/directory/DomainFilter'
import { EmptyState } from '@/components/directory/EmptyState'
import { MemberCard } from '@/components/directory/MemberCard'
import { RoleFilter } from '@/components/directory/RoleFilter'
import { SearchInput } from '@/components/directory/SearchInput'
import { filterMembers } from '@/lib/filterMembers'
import { Profile, Role } from '@/types'
import React, { useMemo, useState } from 'react'

interface DirectoryClientProps {
  members: Profile[]
  currentUserId: string
}

function computeAvailableDomains(members: Profile[]): string[] {
  const domainCounts = members.reduce(
    (acc, m) => {
      m.domains.forEach((d) => {
        acc[d] = (acc[d] ?? 0) + 1
      })
      return acc
    },
    {} as Record<string, number>
  )

  return Object.entries(domainCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([domain]) => domain)
}

export const DirectoryClient: React.FC<DirectoryClientProps> = ({
  members,
  currentUserId,
}) => {
  const [query, setQuery] = useState('')
  const [activeRole, setActiveRole] = useState<Role | null>(null)
  const [activeDomains, setActiveDomains] = useState<string[]>([])

  const availableDomains = useMemo(
    () => computeAvailableDomains(members),
    [members]
  )

  const filtered = useMemo(
    () => filterMembers(members, query, activeRole, activeDomains),
    [members, query, activeRole, activeDomains]
  )

  const handleClearFilters = () => {
    setActiveRole(null)
    setActiveDomains([])
  }

  // Determine which empty state to show
  let emptyState: React.ReactNode = null
  if (filtered.length === 0) {
    if (members.length === 0) {
      emptyState = <EmptyState type="empty-directory" />
    } else if (query.trim()) {
      emptyState = (
        <EmptyState type="no-search-results" query={query.trim()} />
      )
    } else if (activeRole || activeDomains.length > 0) {
      emptyState = (
        <EmptyState
          type="no-filter-results"
          onClearFilters={handleClearFilters}
        />
      )
    }
  }

  return (
    <div className="space-y-6">
      {/* Search input */}
      <SearchInput value={query} onChange={setQuery} />

      {/* Role filter */}
      <RoleFilter activeRole={activeRole} onChange={setActiveRole} />

      {/* Domain filter */}
      <DomainFilter
        activeDomains={activeDomains}
        availableDomains={availableDomains}
        onChange={setActiveDomains}
      />

      {/* Member count */}
      {filtered.length > 0 && (
        <p className="text-sm text-gray-600">
          {filtered.length} member{filtered.length !== 1 ? 's' : ''}
        </p>
      )}

      {/* Grid or empty state */}
      {emptyState ? (
        emptyState
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              isCurrentUser={member.id === currentUserId}
            />
          ))}
        </div>
      )}
    </div>
  )
}
