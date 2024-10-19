'use client';

import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Header } from '@/components/auth/header';
import { Social } from '@/components/auth/social';

interface CardWrapperProps {
  children: React.ReactNode;
  headLabel: string;
  showSocial?: boolean;
}

export const CardWrapper = ({ children, headLabel, showSocial }: CardWrapperProps) => {
  return (
    <Card className="sm:w-[400px] w-[300px] border-none shadow-none">
      <CardHeader className="py-2">
        <Header label={headLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>

      {showSocial && (
        <>
          <div className="mb-4 border-b text-center w-4/5 mx-auto">
            <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
              Or continue with
            </div>
          </div>
          <CardFooter>
            <Social />
          </CardFooter>
        </>
      )}
    </Card>
  );
};
