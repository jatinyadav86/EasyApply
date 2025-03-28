import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';

const protectedRoutes = [
  '/hscbkt53fn75fj/admin',
  '/hscbkt53fn75fj/admin/applied',
  '/profile',
  '/applied'
]


export async function middleware(request) {

  const { pathname } = request.nextUrl


  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    const cookieStore = await cookies()
    const nextToken = cookieStore.get('__Secure-next-auth.session-token')

    if (!nextToken) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/hscbkt53fn75fj/admin', '/hscbkt53fn75fj/admin/applied', '/profile', '/applied'],
}