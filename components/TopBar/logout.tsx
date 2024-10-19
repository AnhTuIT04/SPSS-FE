'use client';

import { useTransition } from 'react';

import { MenubarItem, MenubarShortcut } from '@/components/ui/menubar';
import { LoginIcon } from '@/constants/icons';
import { logout } from '@/actions';

export default function Logout() {
  const [isPending, startTransition] = useTransition();

  const handleOnClick = () => {
    startTransition(() => {
      logout();
    });
  };

  return (
    <MenubarItem onClick={handleOnClick} disabled={isPending}>
      Sign out
      <MenubarShortcut>
        <LoginIcon stroke="#64748B" width="24" height="24" />
      </MenubarShortcut>
    </MenubarItem>
  );
}
