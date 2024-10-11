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
    </nav>
  );
};

export default TopBar;
