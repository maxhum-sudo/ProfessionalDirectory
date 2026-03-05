import { Avatar } from '@/components/ui/Avatar'
import { Tag } from '@/components/ui/Tag'
import { ROLE_COLORS, Profile } from '@/types'
import Link from 'next/link'

interface ProfileHeaderProps {
  member: Profile
  isCurrentUser: boolean
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  member,
  isCurrentUser,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-6 items-start mb-8">
      <Avatar src={member.avatar_url} name={member.name} size="lg" />

      <div className="flex-1">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h1>
        <p className="text-gray-600 mb-4">{member.headline}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          <Tag label={member.role} color={ROLE_COLORS[member.role]} />
          {member.domains.map((domain) => (
            <Tag key={domain} label={domain} color="bg-gray-100 text-gray-800" />
          ))}
        </div>

        {isCurrentUser && (
          <Link href="/me" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
            Edit profile →
          </Link>
        )}
      </div>
    </div>
  )
}
