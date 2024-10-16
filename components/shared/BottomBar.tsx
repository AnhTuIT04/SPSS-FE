'use client';

import { sideBarLinks } from '@/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const BottomBar = () => {
  const pathname = usePathname();

  return (
    <section className="bottombar bg-white">
      <div className="bottombar-container">
        {sideBarLinks.map((link) => {
          const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`bottombar-link px-6
                ${isActive ? 'text-[#141522] bg-[#F5F5F7]' : 'text-[#8E92BC] bg-[#FFFFFF]'}
                ${!isActive ? 'hover:bg-[hsl(240,9%,98.5%)]' : ''}`}
            >
              <div className="w-[24px] h-[24px]">
                <link.icon stroke={isActive ? '#141522' : '#8E92BC'} />
              </div>
              <p className="max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default BottomBar;
