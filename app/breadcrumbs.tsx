// filepath: /c:/Users/USER/git/topic/app/components/Breadcrumbs.tsx
'use client';

import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbList,
} from '@/components/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Breadcrumbs() {
  const pathname = usePathname();

  // Split the pathname into segments
  const segments = pathname.split('/').filter(Boolean);

  // Determine the current page based on the pathname
  let currentPage = '';
  if (segments.length === 2) {
    currentPage = segments[1];
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">home</BreadcrumbLink>
        </BreadcrumbItem>
        {currentPage && <BreadcrumbSeparator />}
        {currentPage && (
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                {currentPage}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>realtime</DropdownMenuItem>
                <DropdownMenuItem>daily</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
