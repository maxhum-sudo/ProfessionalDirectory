import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const protectedRoutes = ['/directory', '/members', '/me']
  const authOnlyRoutes = ['/survey']
  const authRoutes = ['/auth/login']

  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  const isProtected = protectedRoutes.some(r => pathname.startsWith(r))
  const isAuthOnly = authOnlyRoutes.some(r => pathname.startsWith(r))
  const isAuthRoute = authRoutes.some(r => pathname.startsWith(r))

  if (isProtected || isAuthOnly) {
    if (!user) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }

  if (isProtected && user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('survey_completed')
      .eq('id', user.id)
      .single()

    if (!profile?.survey_completed) {
      return NextResponse.redirect(new URL('/survey', request.url))
    }
  }

  if (isAuthRoute && user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('survey_completed')
      .eq('id', user.id)
      .single()

    if (profile?.survey_completed) {
      return NextResponse.redirect(new URL('/directory', request.url))
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/directory/:path*', '/members/:path*', '/me/:path*', '/survey/:path*', '/auth/:path*']
}
