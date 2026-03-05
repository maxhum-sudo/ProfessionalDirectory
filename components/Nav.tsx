import Link from 'next/link'
import { getUser } from '@/lib/auth'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { NavClient } from './NavClient'

export const Nav = async () => {
  const user = await getUser()
  let profile = null

  if (user) {
    const supabase = await createServerSupabaseClient()
    const { data } = await supabase
      .from('profiles')
      .select('survey_completed')
      .eq('id', user.id)
      .single()
    profile = data
  }

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold text-gray-900">
          Calgary Coworking
        </Link>

        <div className="flex items-center gap-6">
          {user && profile?.survey_completed ? (
            <>
              <Link
                href="/directory"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Directory
              </Link>
              <Link
                href="/me"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                My Profile
              </Link>
              <NavClient />
            </>
          ) : user && !profile?.survey_completed ? (
            <Link
              href="/survey"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Complete your profile →
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              Join the Directory
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
