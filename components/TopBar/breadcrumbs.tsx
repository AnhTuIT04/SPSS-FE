'use client';

import { usePathname } from 'next/navigation';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { SlashIcon } from '@radix-ui/react-icons';

function generateBreadcrumbs(pathname: string) {
  const paths = pathname.split('/').filter((path) => path);
  const breadcrumbs = paths.map((path, index) => {
    const href = '/' + paths.slice(0, index + 1).join('/');
    return { label: path.charAt(0).toUpperCase() + path.slice(1), href };
  });

  return breadcrumbs;
}

export default function TopBarBreadcrumb() {
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumbs(pathname);

  if (breadcrumbs.length <= 3) return <></>;

  return (
    <div className="h-full ml-[104px]">
      <div className="max-lg:block hidden">
        <button
          onClick={() => history.back()}
          className="max-sm:hidden text-[hsl(0,0%,30%)] bg-none border hover:bg-[hsl(0,0%,90%)] font-bold py-2 px-4 rounded flex items-center gap-2"
        >
          Back
        </button>
      </div>
      <Breadcrumb className="max-lg:hidden">
        <BreadcrumbList className="text-base">
          {breadcrumbs.slice(2, breadcrumbs.length).map(
            (breadcrumb, index) =>
              (pathname === breadcrumb.href && (
                <BreadcrumbItem key={index}>
                  <BreadcrumbPage className="font-bold">{breadcrumb.label}</BreadcrumbPage>
                </BreadcrumbItem>
              )) || (
                <span key={index} className="font-semibold flex items-center justify-center">
                  <BreadcrumbLink href={breadcrumb.href}>
                    {breadcrumb.label}&nbsp;&nbsp;&nbsp;
                  </BreadcrumbLink>
                  <BreadcrumbSeparator>
                    <SlashIcon />
                  </BreadcrumbSeparator>
                </span>
              ),
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
