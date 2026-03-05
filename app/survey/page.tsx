import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import SurveyClient from './SurveyClient'

export default async function SurveyPage() {
  const session = await getSession()

  if (!session) {
    redirect('/auth/login')
  }

  return <SurveyClient />
}
