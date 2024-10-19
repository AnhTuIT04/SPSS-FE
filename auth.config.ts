import { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { ZodError } from 'zod';

import { LoginSchema } from '@/schemas';
import { getUserByEmail } from '@/db';

export default {
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
} satisfies NextAuthConfig;
