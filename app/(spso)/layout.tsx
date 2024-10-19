import 'tailwindcss/tailwind.css';                         // Import Tailwind CSS first
import 'primereact/resources/themes/saga-blue/theme.css';  // PrimeReact theme
import 'primereact/resources/primereact.min.css';          // PrimeReact core styles
import 'primeicons/primeicons.css';                        // PrimeIcons
import '@/app/globals.css';
import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";
import TopBar from '@/components/TopBar';
import SideBar from '@/components/SideBar';
import BottomBar from '@/components/BottomBar';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
      <TopBar />
      <main className="flex">
        <SideBar />
        <section className="main-container bg-gray-200">
          <div className="w-full">{children}</div>
        </section>
      </main>
      <BottomBar />
    </PrimeReactProvider>
  );
}
