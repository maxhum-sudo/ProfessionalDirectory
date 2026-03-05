import { DirectoryClient } from '@/app/directory/DirectoryClient'
import { getUser } from '@/lib/auth'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { Profile } from '@/types'

export const revalidate = 60

export default async function DirectoryPage() {
  const user = await getUser()
  const currentUserId = user?.id || ''

  const supabase = await createServerSupabaseClient()
  const { data: members, error } = await supabase
    .from('profiles')
    .select(
      'id, name, headline, avatar_url, role, domains, offering, seeking, contact_link, created_at'
    )
    .eq('in_directory', true)
    .eq('survey_completed', true)
    .order('name', { ascending: true })

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600">Failed to load directory</p>
      </div>
    )
  }

  const typedMembers = (members || []) as Profile[]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Directory</h1>
          <p className="text-gray-600 mt-2">
            Discover and connect with members in our community
          </p>
        </div>

        <DirectoryClient members={typedMembers} currentUserId={currentUserId} />
      </div>
    </div>
  )
}
