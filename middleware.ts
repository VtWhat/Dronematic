import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // if user is not signed in and path is not / or /login - redirect  user to /login
  if (!user && req.nextUrl.pathname !== '/login' && req.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // if user is signed in and path is / - redirect  user to /home
  if (user && req.nextUrl.pathname == '/') {
    return NextResponse.redirect(new URL('/home', req.url))
  }

  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
  await supabase.auth.getSession()

  return res
}

export const config = {
  matcher: [
    '/',
    '/home',
    '/customer/:path*',
    '/service/:path*',
  ],
}
