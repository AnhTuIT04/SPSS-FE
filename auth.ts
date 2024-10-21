import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { ZodError } from 'zod';

import { LoginSchema } from '@/schemas';
import { getUserByEmail } from '@/db';
import { getUserById } from '@/db';

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          let user = null;
          const { email, password } = await LoginSchema.parseAsync(credentials);

          // TODO: Change logic when Backend is implemented //
          user = await getUserByEmail(email);

          if (!user) {
            throw new Error('User not found.');
          }

          // User authentication with OAuth does not require password
          if (!user.password) {
            return user;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) {
            return user;
          }
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }
        }

        return null;
      },
    }),
  ],

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
          session.user.role = token.role;
        }
      }

      return session;
    },
  },

  session: {
    strategy: 'jwt',
  },
});
