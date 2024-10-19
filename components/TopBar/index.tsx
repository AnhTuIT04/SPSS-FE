import { auth } from '@/auth';
import Image from 'next/image';
import Link from 'next/link';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/ui/menubar';

import Logout from '@/components/TopBar/logout';
import { LoginIcon, MoreIcon, PrinterIcon, StudentIcon } from '@/constants/icons';

const TopBar = async () => {
  const session = await auth();
  const isAuthenticated = !!session;

  const handleOnClick = () => {
    console.log('Sign out clicked');
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-[70px] bg-white flex justify-between items-center px-6 shadow-sm z-50">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/assets/logo_bachkhoa.svg" alt="Logo" width={50} height={50} priority />
        <p className="text-2xl font-bold max-sm:hidden">SPSS</p>
      </Link>

      <div className="relative flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <Image
              src={session.user.image || '/assets/guest.png'}
              alt="avatar"
              width={44}
              height={44}
              className="rounded-full"
            />
            <div>
              <p className="text-sm font-medium">{session.user.name}</p>
              <p className="text-xs text-muted-foreground">
                {session.user.role.charAt(0).toUpperCase() + session.user.role.slice(1)}
              </p>
            </div>
            <Menubar className="w-6 h-6 p-0 flex items-center justify-center rounded-full border-none shadow-none">
              <MenubarMenu>
                <MenubarTrigger className="p-0 rounded-full">
                  <MoreIcon stroke="#020817" />
                </MenubarTrigger>

                <MenubarContent className="absolute top-2 right-[-24px]">
                  <Link href="/profile">
                    <MenubarItem>
                      My Profile
                      <MenubarShortcut>
                        <StudentIcon stroke="#64748B" width="24" height="24" />
                      </MenubarShortcut>
                    </MenubarItem>
                  </Link>

                  <Link href="/print">
                    <MenubarItem>
                      Print
                      <MenubarShortcut>
                        <PrinterIcon stroke="#64748B" width="24" height="24" />
                      </MenubarShortcut>
                    </MenubarItem>
                  </Link>

                  {/* <MenubarItem disabled>New Incognito Window</MenubarItem> */}

                  <MenubarSeparator />

                  <MenubarSub>
                    <MenubarSubTrigger>Settings</MenubarSubTrigger>
                    <MenubarSubContent>
                      <Link href="/spso-system">
                        <MenubarItem>SPSO System</MenubarItem>
                      </Link>
                      <Link href="/notification">
                        <MenubarItem>Notification</MenubarItem>
                      </Link>
                    </MenubarSubContent>
                  </MenubarSub>

                  <MenubarSeparator />

                  <Logout />
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </>
        ) : (
          <div className="flex gap-4">
            <Link href="/login">
              <button className="w-[100px] px-4 py-2 font-bold text-blue-700 bg-transparent border border-[hsl(217,91%,50%)] rounded hover:bg-[hsl(217,91%,50%)] hover:text-white hover:border-transparent">
                Login
              </button>
            </Link>
            <Link href="/register">
              <button className="w-[100px] px-4 py-2 font-bold text-white bg-[hsla(120,50%,50%,1)] rounded hover:bg-[hsla(120,50%,40%,1)]">
                Register
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopBar;
