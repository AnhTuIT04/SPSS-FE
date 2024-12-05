import { auth } from '@/auth';

import { DEFAULT_AUTH_REDIRECT, apiAuthPrefix, publicRoutes, authRoutes } from '@/routes';
import apiHandler from '@/middlewares'

export default auth((req) => {
  const { nextUrl } = req;

  if (nextUrl.pathname.startsWith('/api')) {
    return apiHandler(req);
  }

  const pathname = nextUrl.pathname;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);

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

  // Redirect to access-forbidden if user role does not match the route (e.g. student trying to access /spso/...)
  const role = req.auth?.user.role;
  if (pathname.startsWith('/spso') || pathname.startsWith('/student')) {
    if (role && !pathname.startsWith(`/${role}`)) {
      console.log(`User role ${role} does not match route ${pathname}`);
      return Response.redirect(new URL('/access-forbidden', nextUrl));
    }
  }
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
