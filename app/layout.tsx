import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';

import Loading from '@/app/loading';

export const metadata: Metadata = {
  title: 'SPSS',
  description: 'Smart Printing Service for Students',
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<Loading />}>
          <main>{children}</main>
        </Suspense>
      </body>
    </html>
  );
}
