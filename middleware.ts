import authConfig from '@/auth.config';
import NextAuth from 'next-auth';

import { DEFAULT_AUTH_REDIRECT, apiAuthPrefix, publicRoutes, authRoutes } from '@/routes';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Allow access to public routes and API auth routes
  if (isPublicRoute || isApiAuthRoute) {
    return;
  }

  // Redirect to DEFAULT_AUTH_REDIRECT if logged in and trying to access an auth route (auth routes used for authentication)
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_AUTH_REDIRECT, nextUrl));
    }
    return;
  }

  // Redirect to login if not logged in and trying to access a protected route
  if (!isLoggedIn) {
    return Response.redirect(new URL('/login', nextUrl));
  }
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
