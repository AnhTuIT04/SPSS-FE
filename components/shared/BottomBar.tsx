'use client';

import { sideBarLinks } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const BottomBar = () => {
  const pathname = usePathname();

  return (
    <section className="bottombar bg-yellow-200">
      <div className="bottombar-container">
        {sideBarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          
          return (
            <Link
              href={link.route}
              key={link.label}
              className={`bottombar-link ${isActive && "bg-primary-cyan"}`}
            >
              <Image 
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className='max-sm:hidden'>{link.label}</p>
            </Link>
          )
        })}
      </div>
    </section>
  );
};

export default BottomBar;
