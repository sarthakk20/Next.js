import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


  export function middleware(request: NextRequest) {
    // return NextResponse.redirect(new URL('/home', request.url))
    const path = request.nextUrl.pathname;

    // const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail' || path === '/resetpassword' || path.startsWith('/resetpassword/');

    const publicPaths = ['/login', '/signup', '/verifyemail', '/resetpassword'];
    const isPublicPath = publicPaths.includes(path) || path.startsWith('/resetpassword/');
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
    return NextResponse.next();
  }
  
  // See "Matching Paths" below to learn more
  export const config = {
    matcher: [
      '/',
      '/profile',
      '/profile/:path*',
      '/login',
      '/signup',
      '/verifyemail',
      '/resetpassword',
      '/resetpassword/:path*',
    ]
  }