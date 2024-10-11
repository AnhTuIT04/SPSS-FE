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
                width={30}
                height={30}
              />
              <p className="max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
