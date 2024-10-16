import '@/app/globals.css';
import TopBar from '@/components/shared/TopBar';
import SideBar from '@/components/shared/SideBar';
import BottomBar from '@/components/shared/BottomBar';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div>{children}</div>;
}
