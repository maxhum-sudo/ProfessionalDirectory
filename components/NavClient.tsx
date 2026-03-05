'use client'

import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { Button } from './ui/Button'

export const NavClient = () => {
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleSignOut}
      className="text-sm"
    >
      Sign out
    </Button>
  )
}
