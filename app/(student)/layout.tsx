import '@/app/globals.css';
import TopBar from '@/components/shared/TopBar';
import SideBar from './student/commons/SideBar';
import BottomBar from '@/components/shared/BottomBar';

export default function StudentLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <TopBar />
      <main className="flex">
        <SideBar />
        <section className="main-container bg-gray-200">
          <div className="w-full">{children}</div>
        </section>
      </main>
      <BottomBar />
    </>
  );
}
