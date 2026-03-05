import { getUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { LoginForm } from './LoginForm'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams
  const user = await getUser()

  if (user && !error) {
    redirect('/directory')
  }

  return <LoginForm error={error} />
}
