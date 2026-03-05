import Link from 'next/link'
import { getUser } from '@/lib/auth'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { Button } from '@/components/ui/Button'

export default async function Home() {
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

  const isComplete = user && profile?.survey_completed

  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center py-12 px-4">
      <div className="max-w-2xl text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight">
            Calgary&apos;s remote worker network
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
            A private directory of 100+ Calgary professionals working remotely. Fill out one survey to join.
          </p>
        </div>

        {isComplete ? (
          <Link href="/directory">
            <Button size="lg" className="text-lg">
              Go to Directory
            </Button>
          </Link>
        ) : (
          <Link href="/auth/login">
            <Button size="lg" className="text-lg">
              Join the Directory
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
