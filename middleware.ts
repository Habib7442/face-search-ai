import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // List of protected routes that require authentication
  const protectedRoutes = ['/upload']
  
  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    // Check if the access_token cookie exists
    const token = request.cookies.get('access_token')
    
    if (!token) {
      // Redirect to login if no token is found
      return NextResponse.redirect(new URL('/auth', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/upload']
}