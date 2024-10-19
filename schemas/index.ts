import * as z from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.string().default('student'),
  image: z.string().default('/assets/guest.png'),
  // emailVerified: z.boolean(),
  // oauthProvider: z.string().optional(),
  // oauthId: z.string().optional(),
  password: z.string().optional(),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address',
  }),
  password: z.string().min(6, {
    message: 'Minimum 6 characters required',
  }),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  email: z.string().email({
    message: 'Invalid email address',
  }),
  password: z.string().min(6, {
    message: 'Minimum 6 characters required',
  }),
});
