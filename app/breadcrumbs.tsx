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
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">home</BreadcrumbLink>
        </BreadcrumbItem>
        {segments[1] && <BreadcrumbSeparator />}
        {segments[1] && (
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                {segments[1]}
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
