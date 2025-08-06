import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { log } from 'node:console';

  export function middleware(request: NextRequest) {
    // return NextResponse.redirect(new URL('/home', request.url))
    const path = request.nextUrl.pathname;

    const isPublicPath = path === '/login' || path === '/signup';
    const token = request.cookies.get('token')?.value || '';

    if (isPublicPath && token) {
      // If the user is authenticated, redirect them to the home page
      console.log(`User is authenticated, redirecting from ${path} to home`);
      return NextResponse.redirect(new URL('/', request.url));
    }

    if (!isPublicPath && !token) {
      // If the user is not authenticated, redirect them to the login page
      console.log(`User is not authenticated, redirecting from ${path} to login`);      
      return NextResponse.redirect(new URL('/login', request.url));
    }

  }
  
  // See "Matching Paths" below to learn more
  export const config = {
    matcher: [
      '/',
      '/profile',
      '/profile/:path*',
      '/login',
      '/signup'
    ]
  }