'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import path from 'path';

const TopBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Mock user data, when integrating with backend, replace this with real user data (useEffect)
  const user = {
    name: 'Moni Roy',
    role: 'Admin',
    avatar: '/assets/mooc/avatar.png',
  };

  const menuItems = [
    { name: 'My Profile', icon: '/assets/student.svg', path: '/profile' },
    { name: 'Settings', icon: '/assets/setting.svg', path: '/settings' },
    { name: 'Logout', icon: '/assets/logout.svg', path: '/logout' },
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
    router.push(path);
    setShowMenu(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-[70px] bg-red-200 flex justify-between items-center px-6 shadow-md z-50">
      <Link href={'/spso/dashboard'} className="flex items-center gap-4">
        <Image src="/assets/logo_bachkhoa.svg" alt="Logo" width={50} height={50} />
        <p className="font-semibold text-lg max-sm:hidden">SPSS</p>
      </Link>

      <div className="relative flex items-center gap-4 cursor-pointer" ref={menuRef}>
        <Image src={user.avatar} alt="avatar" width={44} height={44} className="rounded-full" />
        <div>
          <p className="font-semibold">{user.name}</p>
          <p className="text-sm text-gray-500">{user.role}</p>
        </div>

        <Image src={'/assets/more.svg'} alt="more" width={24} height={24} onClick={() => setShowMenu(!showMenu)} className="cursor-pointer" />

        {showMenu && (
          <div className="absolute right-0 top-full mt-3 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <ul>
              {menuItems.map((item) => (
                <li
                  key={item.name}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-lg flex items-center gap-2"
                  onClick={() => handleNavigation(item.path)}
                >
                  <Image src={item.icon} alt={item.name} width={20} height={20} />
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopBar;
