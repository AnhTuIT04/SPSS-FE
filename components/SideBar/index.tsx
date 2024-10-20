import Image from 'next/image';
import { auth } from '@/auth';

import MenuItems from '@/components/MenuItems';

export default async function SideBar() {
  const session = await auth();

  return (
    <section className="custom-scrollbar sidebar">
      <MenuItems role={session?.user.role || ''} isSideBar />

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
