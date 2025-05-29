import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Public routes that don't require authentication
const publicPaths = [
  '/',
  '/sign-in',
  '/sign-in/*',
  '/sign-up',
  '/sign-up/*',
  '/waitlist',
  '/waitlist/*',
  '/sso-callback',
  '/sso-callback/*',
  '/api/*',
  '/(api|trpc)(.*)'
];

// Check if the current route is public
const isPublicRoute = (path: string) => {
  // Remove trailing slash for consistent matching
  const cleanPath = path.endsWith('/') ? path.slice(0, -1) : path;
  
  return publicPaths.some(publicPath => {
    // Convert the public path to a regex pattern
    const pattern = `^${publicPath.replace(/\*/g, '.*')}$`;
    return new RegExp(pattern).test(cleanPath);
  });
};

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const url = new URL(req.url);
  const pathname = url.pathname;
  
  // Debug log
  console.log('Middleware - Path:', pathname, '| User ID:', userId || 'not signed in');
  
  // Allow public routes
  if (isPublicRoute(pathname)) {
    console.log('Allowing public route:', pathname);
    return NextResponse.next();
  }
  
  // If user is signed in and tries to access auth pages, redirect to dashboard
  if (userId && (pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up'))) {
    console.log('Redirecting authenticated user from auth page to /dashboard');
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
  
  // Redirect to sign-in for protected routes if not authenticated
  if (!userId) {
    console.log('Redirecting to sign-in from protected route:', pathname);
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('redirect_url', pathname);
    return NextResponse.redirect(signInUrl);
  }
  
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Match all request paths except for the ones starting with:
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    // - public folder
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};