'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { StudentIcon, SettingIcon, LogoutIcon, MoreIcon } from '@/constants/icons';

import user from '@/public/mooc/user';

const TopBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Mock user data, when integrating with backend, replace this with real user data
  // useEffect ...

  const menuItems = [
    { name: 'My Profile', icon: StudentIcon, path: '/profile' },
    { name: 'Setting', icon: SettingIcon, path: '/spso/setting' },
    { name: 'Logout', icon: LogoutIcon, path: '/logout' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigation = (path: string) => {
    // Remember to clear the token when logging out: IMPORTANT
    if (path === '/logout') {
      setIsLoggedIn(false);
      setShowMenu(false);
      return;
    }

    router.push(path);
    setShowMenu(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-[70px] bg-white flex justify-between items-center px-6 shadow-sm z-50">
      <Link href={'/'} className="flex items-center gap-4">
        <Image src="/assets/logo_bachkhoa.svg" alt="Logo" width={50} height={50} priority />
        <p className="text-2xl font-bold max-sm:hidden">SPSS</p>
      </Link>

      <div className="relative flex items-center gap-4" ref={menuRef}>
        {isLoggedIn ? (
          <>
            <Image src={user.avatar} alt="avatar" width={44} height={44} className="rounded-full" />
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-500">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
            </div>

            <MoreIcon onClick={() => setShowMenu(!showMenu)} className="cursor-pointer w-6 h-6" />

            {showMenu && (
              <div className="absolute right-0 z-50 w-48 mt-3 bg-white border border-gray-200 rounded-lg shadow-lg top-full">
                <ul>
                  {menuItems.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100"
                      onClick={() => handleNavigation(item.path)}
                    >
                      <item.icon width={20} height={20} />
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        ) : (
          <div className="flex gap-4">
            <button
              // onClick={() => handleNavigation('/login')}
              onClick={() => setIsLoggedIn(true)}
              className="w-[100px] px-4 py-2 font-bold text-blue-700 bg-transparent border border-[hsl(217,91%,50%)] rounded hover:bg-[hsl(217,91%,50%)] hover:text-white hover:border-transparent"
            >
              Login
            </button>
            <button
              onClick={() => handleNavigation('/register')}
              className="w-[100px] px-4 py-2 font-bold text-white bg-[hsla(120,50%,50%,1)] rounded hover:bg-[hsla(120,50%,40%,1)]"
            >
              Register
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopBar;
