import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: { id: string; role: string } & User;
  }
  interface JWT {
    role: string;
  }
}
