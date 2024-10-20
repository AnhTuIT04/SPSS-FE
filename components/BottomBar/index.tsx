import { auth } from '@/auth';

import MenuItems from '@/components/MenuItems';

const BottomBar = async () => {
  const session = await auth();

  return (
    <section className="bottombar bg-white">
      <MenuItems role={session?.user.role || ''} isSideBar={false} />
    </section>
  );
};

export default BottomBar;
