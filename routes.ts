/**
 * An array of route that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = ['/'];

/**
 * The default route to redirect to after a successful login
 * @type {string}
 */
export const DEFAULT_AUTH_REDIRECT = '/';

/**
 * An array of route that are used for authentication
 * These routes will be redirected logged in users to DEFAULT_AUTH_REDIRECT
 * @type {string[]}
 */
export const authRoutes = ['/login', '/register', '/forgot-password', '/reset-password'];

/**
 * The prefix for the authentication API routes
 * Routes that start with this prefix will be used for authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = '/api';
