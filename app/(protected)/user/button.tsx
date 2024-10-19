// app/LogoutButton.tsx (Client Component)
'use client';

import { logout } from '@/actions'; // Import Server Action

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return <button onClick={handleLogout}>Sign out</button>;
}
