import { ContactButton } from '@/components/profile/ContactButton'
import { OfferAskPanel } from '@/components/profile/OfferAskPanel'
import { ProfileHeader } from '@/components/profile/ProfileHeader'
import { getUser } from '@/lib/auth'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { Profile } from '@/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
}

export default async function MemberProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const user = await getUser()
  const currentUserId = user?.id

  const supabase = await createServerSupabaseClient()

  const { data: member } = await supabase
    .from('profiles')
    .select(
      'id, name, headline, avatar_url, role, domains, offering, seeking, contact_link, in_directory, survey_completed, created_at, updated_at'
    )
    .eq('id', id)
    .single()

  const isOwnProfile = currentUserId === id
  if (!member || (!isOwnProfile && (!member.in_directory || !member.survey_completed))) {
    notFound()
  }

  const isCurrentUser = isOwnProfile

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <Link
        href="/directory"
        className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 text-sm font-medium mb-8 transition-colors"
      >
        ← Back to Directory
      </Link>

      {isCurrentUser && (
        <div className="mb-8 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
          <p className="text-sm text-indigo-900">
            This is how others see your profile.{' '}
            <Link href="/me" className="font-semibold hover:underline">
              Edit profile
            </Link>
          </p>
        </div>
      )}

      <ProfileHeader member={member} isCurrentUser={isCurrentUser} />

      <OfferAskPanel offering={member.offering} seeking={member.seeking} />

      {!isCurrentUser && (
        <ContactButton href={member.contact_link} name={member.name} />
      )}

      <p className="text-sm text-gray-400 mt-8">
        Member since {formatDate(member.created_at)}
      </p>
    </div>
  )
}
