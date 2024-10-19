import Image from 'next/image';
import { headers } from 'next/headers';
import { auth } from '@/auth';
import Link from 'next/link';

import { spsoSideBarLinks } from '@/constants/spso';
import { studentSideBarLinks } from '@/constants/student';

export default async function SideBar() {
  const session = await auth();
  const sideBarLinks =
    session?.user.role === 'spso'
      ? spsoSideBarLinks
      : session?.user.role === 'student'
      ? studentSideBarLinks
      : [];

  const heads = headers();
  const pathname = heads.get('next-url') || '/spso/dashboard';

  return (
    <section className="custom-scrollbar sidebar">
      <div className="action-wrapper">
        {sideBarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`sidebar-link pl-6 pr-10 
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

      <div className="help-center absolute left-[50%] translate-x-[-50%] bottom-4 w-[80%] h-64 rounded-[10px] max-lg:hidden hide-if-short">
        <span className="absolute top-0 left-[50%] translate-x-[-50%] translate-y-[-45%] z-20">
          <Image
            src="/assets/question.png"
            width={100}
            height={100}
            alt="Question"
            className="w-auto h-auto"
            priority
          />
        </span>
        <div className="help-content absolute left-[50%] translate-x-[-50%] bottom-0 w-full h-64 rounded-[10px] overflow-hidden bg-[#141522]">
          <div className="description mt-[32px]">
            <h2 className="text-white text-center font-semibold text-xl">SPSS</h2>
            <p className="text-white text-center mt-1 px-[15px] text-xs">
              A Smart Printing Service for Students
            </p>
          </div>

          <div className="copyright mt-5">
            <p className="text-white text-center mt-1 px-[1px] text-xs">
              Bản quyền thuộc hcmut.edu.vn
            </p>
            <p className="text-white text-center mt-1 px-[1px] text-xs">Liên hệ: 0999.888.777</p>
            <p className="text-white text-center mt-1 px-[1px] text-xs">Email: spss@hcmut.edu.vn</p>
          </div>

          <button
            type="button"
            className="absolute left-[50%] translate-x-[-50%] bottom-3 w-[80%] py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-[10px] border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
          >
            Contact us!
          </button>
        </div>
      </div>
    </section>
  );
}
