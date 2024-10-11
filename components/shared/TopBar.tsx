import Image from 'next/image';
import Link from 'next/link';

const TopBar = () => {
  return (
    <nav className="topbar bg-red-200">
      <Link href={'/spso/dashboard'} className="flex items-center gap-4">
        <Image
          src="/assets/logo_bachkhoa.svg"
          alt="Logo"
          width={50}
          height={50}
        />
        <p className="font-semibold max-xs:hidden">SPSS</p>
      </Link>
      <div className="flex gap-4 items-center pr-8 cursor-pointer">
        <span>
          <p>Tên Đăng Nhập</p>
        </span>
        <Image
          src={'/assets/logo_bachkhoa.svg'}
          alt="avatar"
          width={46}
          height={46}
        />
      </div>
    </nav>
  );
};

export default TopBar;
