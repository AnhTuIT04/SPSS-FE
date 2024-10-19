/**
 * @file actions/index.ts
 * @description All the actions that can be performed by the user
 * TODO: Change logic when Backend is implemented
 */

'use server';

import { AuthError } from 'next-auth';
import * as z from 'zod';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

import { signIn, signOut } from '@/auth';
import { getUserByEmail, saveUser } from '@/db';
import { UserSchema, LoginSchema, RegisterSchema } from '@/schemas';
import { DEFAULT_AUTH_REDIRECT } from '@/routes';

const saltRounds = 10;

export const login = async (user: z.infer<typeof LoginSchema>) => {
  const validatedField = LoginSchema.safeParse(user);
  if (!validatedField.success) {
    return { error: 'Please fill in all the fields!' };
  }

  const { email, password } = validatedField.data;

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_AUTH_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === 'CredentialsSignin') {
        return { error: 'Invalid credentials!' };
      }
    }

    throw error;
  }

  return { success: 'Login successful' };
};

export const register = async (user: z.infer<typeof RegisterSchema>) => {
  const validatedField = RegisterSchema.safeParse(user);
  if (!validatedField.success) {
    return { error: 'Please fill in all the fields!' };
  }

  const { name, email, password } = user;

  const userExists = await getUserByEmail(email);
  if (!!userExists) {
    return { error: 'User already exists' };
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const id = uuidv4();
  const newUser = UserSchema.parse({ id, name, email, password: hashedPassword });

  saveUser(newUser);

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_AUTH_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === 'CredentialsSignin') {
        return { error: 'Invalid credentials!' };
      }
    }

    throw error;
  }

  return { success: 'Your account has been created' };
};

export const oAuthLogin = async (email: string, name: string) => {
  let user = getUserByEmail(email);

  if (!user) {
    const id = uuidv4();
    const newUser = UserSchema.parse({
      id,
      name,
      email,
    });

    saveUser(newUser);
  }

  return { success: 'OAuth login successful', user };
};

export const logout = async () => {
  await signOut({
    redirectTo: '/',
  });
};
