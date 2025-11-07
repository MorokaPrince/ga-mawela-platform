import { auth } from '@/app/api/auth/[...nextauth]/route'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { Session } from 'next-auth'

export default auth((req: NextRequest & { auth: Session | null }) => {
  const isAuth = !!req.auth
  const isAuthPage = req.nextUrl.pathname.startsWith('/auth')
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin') || req.nextUrl.pathname.startsWith('/api/admin')

  if (isAdminRoute && (!isAuth || req.auth?.user?.role !== 'admin')) {
    return NextResponse.redirect(new URL('/auth/signin', req.url))
  }

  if (isAuthPage && isAuth) {
    return NextResponse.redirect(new URL('/admin', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}