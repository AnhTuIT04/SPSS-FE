import Image from 'next/image';
import Link from 'next/link';

import '@/app/globals.css';
import TopBar from '@/components/TopBar';
import { auth } from '@/auth';

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const isAuthenticated = !!session;
  const role = session?.user.role;

  return (
    <div>
      <TopBar />
      <div className="container p-8 mt-[70px] mx-auto xl:px-0">
        <div className="flex flex-wrap px-8">
          <div className="flex items-center w-full lg:w-1/2">
            <div className="max-w-2xl mb-8">
              <h1 className="text-[36px] font-bold leading-snug tracking-tight text-gray-800 lg:text-[36px] lg:leading-tight xl:text-[48px] xl:leading-tight dark:text-white">
                A smart printing service for students at HCMUT
              </h1>
              <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
                Với SPSS, việc in tài liệu, bài tập, báo cáo, và luận văn trở nên đơn giản hơn bao
                giờ hết. Chỉ cần tải lên tài liệu, chọn máy in gần nhất, và nhận bản in nhanh chóng.
                SPSS còn cung cấp các tính năng tiện ích như xem lại tài liệu đã in, theo dõi lịch
                sử giao dịch, quản lý tài khoản hiệu quả với chi phí phải chăng. Chúng tôi luôn ưu
                tiên sự tiện lợi và trải nghiệm của bạn.
              </p>

              <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row mt-6">
                <Link href={isAuthenticated ? `/${role}/dashboard` : '/login'}>
                  <button
                    type="button"
                    className="text-white bg-[hsl(217,91%,50%)] hover:bg-[hsl(217,91%,40%)] focus:outline-none focus:ring-4 focus:ring-blue-300 text-lg font-medium rounded-[14px] px-8 py-4 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Get started
                  </button>
                </Link>

                <Link href={'#' /** TODO add logic here */}>
                  <button
                    type="button"
                    className="text-gray bg-[hsl(0,0%,100%)] border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 text-lg font-medium rounded-[14px] px-8 py-4 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Contact us!
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center w-full lg:w-1/2 max-lg:hidden">
            <Image
              src={'/assets/hero.png'}
              width={400}
              height={400}
              className="w-[400px] h-[400px]"
              alt="Hero Illustration"
              loading="eager"
              priority
            />
          </div>
        </div>

        <div className="text-base text-center text-gray-700 dark:text-white">
          Trusted by <span className="text-indigo-600">2000+</span> students
        </div>

        {children}
      </div>
    </div>
  );
}
