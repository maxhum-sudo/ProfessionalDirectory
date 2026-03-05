import { getUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import SurveyClient from './SurveyClient'

export default async function SurveyPage() {
  const user = await getUser()

  if (!user) {
    redirect('/auth/login')
  }

  return <SurveyClient />
}
