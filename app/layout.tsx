import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import { EdgeStoreProvider } from '../lib/edgestorefile';

import Loading from '@/app/loading';


export const metadata: Metadata = {
  title: 'SPSS',
  description: 'Smart Printing Service for Students',
};

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<Loading />}>
          <main><EdgeStoreProvider>{children}</EdgeStoreProvider></main>
        </Suspense>
      </body>
    </html>
  );
}
