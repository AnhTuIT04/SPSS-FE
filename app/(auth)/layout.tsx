import '@/app/globals.css';

import Link from 'next/link';
import { HomeIcon } from '@/constants/icons';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="relative max-w-screen-xl m-0 sm:m-8 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <Link href={'/'} className="absolute top-4 left-4 text-indigo-600 hover:underline">
          <div className="bg-[#E0E7FF] py-4 px-5 rounded-[8px]">
            <HomeIcon className="w-5 h-5" />
          </div>
        </Link>
        <div className="flex flex-col items-center justify-end">{children}</div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/assets/bg_auth.svg')",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
