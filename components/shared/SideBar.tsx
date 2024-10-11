'use client';

import Image from 'next/image';
import { sideBarLinks } from '@/constants';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function SideBar() {
  const pathname = usePathname();

  return (
    <section className="custom-scrollbar sidebar">
      <div>
        {sideBarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`sidebar-link ${isActive && 'bg-primary-cyan'}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>
      <div className='h-60 w-full bg-orange-300 flex justify-center items-center max-lg:hidden'><p>Help Center</p></div>
    </section>
  );
}
