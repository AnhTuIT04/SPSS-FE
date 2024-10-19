'use server';

import * as z from 'zod';
import fs from 'fs';
import { UserSchema } from '@/schemas';

const USERS_FILE_PATH = 'db/users.json';

const readUsersFromFile = () => {
  try {
    const data = fs.readFileSync(USERS_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users file:', error);
    return [];
  }
};

const writeUsersToFile = (users: z.infer<typeof UserSchema>) => {
  try {
    fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error writing to users file:', error);
  }
};

export const getUsers = async () => {
  return await readUsersFromFile();
};

export const getUserById = async (id: string) => {
  const users = await readUsersFromFile();
  return users.find((u: z.infer<typeof UserSchema>) => u.id === id);
};

export const getUserByEmail = async (email: string) => {
  const users = await readUsersFromFile();
  return users.find((u: z.infer<typeof UserSchema>) => u.email === email);
};

export const saveUser = async (user: z.infer<typeof UserSchema>) => {
  const users = await readUsersFromFile();
  users.push(user);
  await writeUsersToFile(users);
};
