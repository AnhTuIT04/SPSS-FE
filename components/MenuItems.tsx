'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { spsoMenuItems } from '@/constants/spso';
import { studentMenuItems } from '@/constants/student';

interface MenuItemsProps {
  role: string;
  isSideBar: boolean;
}

const MenuItems = ({ role, isSideBar }: MenuItemsProps) => {
  const pathname = usePathname();
  const menuItems = role === 'spso' ? spsoMenuItems : role === 'student' ? studentMenuItems : [];

  return (
    <div className={isSideBar ? 'sidebar-wrapper' : 'bottombar-wrapper'}>
      {menuItems.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) || pathname === item.route;

        return (
          <Link
            href={item.route}
            key={item.label}
            className={`${isSideBar ? 'sidebar-link pl-6 pr-10 ' : 'bottombar-link px-6 '}  
                ${isActive ? 'text-[#141522] bg-[#F5F5F7]' : 'text-[#8E92BC] bg-[#FFFFFF]'}
                ${!isActive ? 'hover:bg-[hsl(240,9%,98.5%)]' : ''}`}
          >
            <div className="w-[24px] h-[24px]">
              <item.icon stroke={isActive ? '#141522' : '#8E92BC'} />
            </div>
            <p className={isSideBar ? 'max-lg:hidden' : 'max-[690px]:hidden'}>{item.label}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default MenuItems;
