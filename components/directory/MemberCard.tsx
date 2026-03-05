import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { Tag } from '@/components/ui/Tag'
import { Profile, ROLE_COLORS } from '@/types'
import Link from 'next/link'
import React from 'react'

interface MemberCardProps {
  member: Omit<Profile, 'email' | 'survey_completed'>
  isCurrentUser?: boolean
}

export const MemberCard: React.FC<MemberCardProps> = ({
  member,
  isCurrentUser = false,
}) => {
  const roleColor = ROLE_COLORS[member.role]
  const visibleDomains = member.domains.slice(0, 3)
  const hiddenDomainCount = member.domains.length - 3

  // Card content
  const cardContent = (
    <div className="flex flex-col h-full gap-4">
      {/* Header with avatar, name, and You badge */}
      <div className="flex gap-3 items-start">
        <Avatar src={member.avatar_url} name={member.name} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 line-clamp-1">
                {member.name}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {member.headline}
              </p>
            </div>
            {isCurrentUser && (
              <div className="flex-shrink-0 bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full text-xs font-medium">
                You
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Role pill */}
      <div className="flex gap-2 flex-wrap">
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${roleColor}`}
        >
          {member.role}
        </span>
      </div>

      {/* Domains */}
      {member.domains.length > 0 && (
        <div className="flex gap-2 flex-wrap items-center">
          {visibleDomains.map((domain) => (
            <Tag key={domain} label={domain} />
          ))}
          {hiddenDomainCount > 0 && (
            <span className="text-xs text-gray-600">+{hiddenDomainCount} more</span>
          )}
        </div>
      )}

      {/* Offering block */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
          Offering
        </p>
        <p className="text-sm text-gray-700 line-clamp-2">
          {member.offering || '—'}
        </p>
      </div>

      {/* Seeking block */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
          Seeking
        </p>
        <p className="text-sm text-gray-700 line-clamp-2">
          {member.seeking || '—'}
        </p>
      </div>

      {/* Action button */}
      <div className="mt-auto pt-2">
        {isCurrentUser ? (
          <Link href="/me">
            <Button variant="ghost" size="sm" className="w-full text-left">
              Edit profile
            </Button>
          </Link>
        ) : (
          <a
            href={member.contact_link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            <Button variant="primary" size="sm" className="w-full">
              → Connect
            </Button>
          </a>
        )}
      </div>
    </div>
  )

  return (
    <Link href={`/members/${member.id}`}>
      <div className="h-full p-5 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
        {cardContent}
      </div>
    </Link>
  )
}
