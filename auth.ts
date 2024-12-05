import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { ZodError } from 'zod';
import axios from 'axios';

import { LoginSchema } from '@/schemas';
import { getUserByEmail } from '@/db';
import { getUserById } from '@/db';

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } = await LoginSchema.parseAsync(credentials);

          const response = await axios.post('http://localhost:3000/api/v1/user/login', {
            email, password,
          });

          if (response.status !== 200) {
            return null;
          }


          const user = response.data;

          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token }) {
      // TODO add role in token
      if (!token.sub) {
        return token;
      }

      const response = await axios.get(`http://localhost:3000/api/v1/user/${token.sub}`);
      if (response.status !== 200) {
        return token;
      }

      const user = response.data;
      if (!user) {
        return token;
      }

      token.user = user;

      return token;
    },
    async session({ token, session }) {
      // TODO add role and id in session
      if (session.user) {
        if (token.user) {
          session.user = token.user;
        }
      }

      return session;
    },
  },

  session: {
    strategy: 'jwt',
  },
});
