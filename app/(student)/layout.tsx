import type { Metadata } from 'next';
import '../globals.css';
import { Inter } from 'next/font/google';
import TopBar from '@/components/shared/TopBar';
import SideBar from './student/commons/SideBar';
import BottomBar from '@/components/shared/BottomBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SPSS',
  description: 'Smart Printing Service for Students',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TopBar />
        <main className="flex">
          <SideBar />
          <section className="main-container bg-gray-200">
            <div className="w-full">{children}</div>
          </section>
        </main>
        <BottomBar />
      </body>
    </html>
  );
}
