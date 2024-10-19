'use client';

import { Button } from '@/components/ui/button';
import { GoogleIcon, GitHubIcon } from '@/constants/icons';
import { oAuthLogin } from '@/actions';

export const Social = () => {
  const handleLogin = async (provider: string) => {
    // try {
    //   console.log(provider);
    //   const res = await fetch(`/api/auth/${provider}`);
    //   const data = await res.json();
    //   if (data.error) {
    //     console.error(data.error);
    //     return;
    //   }
    //   console.log(data);
    //   // const { email, name } = data;
    //   // // oauthLogin(email, name);
    //   // console.log(email, name);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center w-full gap-x-2">
      <Button
        size="lg"
        className="my-1 w-full h-12 max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
        variant="outline"
        onClick={() => handleLogin('google')}
      >
        <div className="bg-white p-2 rounded-full">
          <GoogleIcon className="w-6 h-6" />
        </div>
        Google
      </Button>

      <Button
        size="lg"
        className="my-1 w-full h-12 max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
        variant="outline"
        onClick={() => console.log('Github')}
      >
        <div className="bg-white p-2 rounded-full">
          <GitHubIcon className="w-6 h-6 " />
        </div>
        <span>Github</span>
      </Button>
    </div>
  );
};
