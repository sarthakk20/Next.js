import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


  export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get("token")?.value;

    // PUBLIC ROUTES
   const publicPaths = [
        "/",
        "/login",
        "/signup",
        "/verifyemail",
        "/resetpassword",
    ];
    const isPublicPath = publicPaths.includes(path) || path.startsWith('/resetpassword/');

     // PROTECTED ROUTES
    const protectedPaths = [
        "/profile",
        '/profile/:path*'
    ];
    const isProtectedRoute = protectedPaths.includes(path);

    if (isPublicPath && token) {
      // If the user is authenticated, redirect them to the profile page
      console.log(`User is authenticated, redirecting from ${path} to profile`);
      return NextResponse.redirect(new URL('/profile', request.url));
    }

    if (!token && isProtectedRoute ) {
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