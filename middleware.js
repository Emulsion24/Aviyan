// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // 1. Define the list of protected routes
  const protectedPaths = ['/dashboard'];
  
  // 2. Check if the current path is one of the protected ones
  const isProtected = protectedPaths.some((path) => 
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtected) {
    // 3. Check for the authentication cookie
    // Make sure this matches the name you set in your Login API ('auth_token')
    const token = request.cookies.get('token') || request.cookies.get('auth_token');

    // 4. If no token is found, redirect to the login page
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      // Optional: Pass the original URL to redirect back after login
      loginUrl.searchParams.set('from', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 5. Allow the request to proceed if authenticated or not a protected route
  return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/dashboard/:path*', // This covers /dashboard AND /dashboard/fileupload
  ],
};