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
import { useDateStore } from './store/dateStore';
import dayjs from 'dayjs';

export default function Breadcrumbs() {
  const pathname = usePathname();
  const { date } = useDateStore();

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
                <DropdownMenuItem>
                  <BreadcrumbLink href="/topic/realtime">
                    realtime
                  </BreadcrumbLink>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BreadcrumbLink
                    href={`/topic/daily/${dayjs(date).format('YYYY-MM-DD')}`}
                  >
                    daily
                  </BreadcrumbLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
