import NextAuth, { User } from 'next-auth';

import authConfig from '@/auth.config';
import { getUserById } from '@/db';

declare module 'next-auth' {
  interface Session {
    user: User & { role: string };
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async jwt({ token }) {
      // TODO add role in token
      if (!token.sub) {
        return token;
      }

      const existingUser = await getUserById(token.sub);
      if (!existingUser) {
        return token;
      }

      token.role = existingUser.role;

      return token;
    },
    async session({ token, session }) {
      // TODO add role and id in session
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub;
        }
        if (token.role) {
          session.user.role = token.role as string;
        }
      }

      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  ...authConfig,
});
