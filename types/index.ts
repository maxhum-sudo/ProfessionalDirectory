export type Role =
  | 'Founder / Co-founder'
  | 'Operator / Executive'
  | 'Software Developer / Engineer'
  | 'Designer (Product / Brand / UX)'
  | 'Marketer / Growth'
  | 'Consultant / Advisor'
  | 'Investor / Angel'
  | 'Freelancer / Contractor'
  | 'Researcher / Analyst'
  | 'Educator / Coach'
  | 'Other'

export const ROLES: Role[] = [
  'Founder / Co-founder',
  'Operator / Executive',
  'Software Developer / Engineer',
  'Designer (Product / Brand / UX)',
  'Marketer / Growth',
  'Consultant / Advisor',
  'Investor / Angel',
  'Freelancer / Contractor',
  'Researcher / Analyst',
  'Educator / Coach',
  'Other',
]

export const ROLE_COLORS: Record<Role, string> = {
  'Founder / Co-founder': 'bg-indigo-100 text-indigo-800',
  'Operator / Executive': 'bg-slate-100 text-slate-800',
  'Software Developer / Engineer': 'bg-emerald-100 text-emerald-800',
  'Designer (Product / Brand / UX)': 'bg-violet-100 text-violet-800',
  'Marketer / Growth': 'bg-orange-100 text-orange-800',
  'Consultant / Advisor': 'bg-amber-100 text-amber-800',
  'Investor / Angel': 'bg-yellow-100 text-yellow-800',
  'Freelancer / Contractor': 'bg-cyan-100 text-cyan-800',
  'Researcher / Analyst': 'bg-blue-100 text-blue-800',
  'Educator / Coach': 'bg-rose-100 text-rose-800',
  'Other': 'bg-gray-100 text-gray-800',
}

export const DOMAIN_SUGGESTIONS: string[] = [
  'SaaS',
  'Fintech',
  'Real Estate',
  'Healthcare',
  'Climate / Cleantech',
  'Education',
  'E-commerce',
  'Media / Content',
  'Legal',
  'Professional Services',
  'Hardware / Manufacturing',
  'Community / Non-profit',
  'AI / ML',
  'Consumer Apps',
  'B2B',
  'Marketing',
  'Design',
  'Engineering',
  'Finance',
]

export interface Profile {
  id: string
  email?: string
  name: string
  headline: string
  avatar_url: string | null
  role: Role
  domains: string[]
  offering: string
  seeking: string
  contact_link: string
  in_directory: boolean
  survey_completed: boolean
  created_at: string
  updated_at: string
}
