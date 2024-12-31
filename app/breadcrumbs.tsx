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
        {segments[0] && <BreadcrumbSeparator />}
        {segments[0] && (
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                {segments[0]}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <BreadcrumbLink
                  href="/topic/realtime"
                  className="w-full bg-slate-300"
                >
                  <DropdownMenuItem>topic</DropdownMenuItem>
                </BreadcrumbLink>
                <BreadcrumbLink href={`/board/감자토픽`} className="w-full">
                  <DropdownMenuItem>board</DropdownMenuItem>
                </BreadcrumbLink>
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
        )}
        {segments[1] && <BreadcrumbSeparator />}
        {segments[1] && (
          <BreadcrumbItem>
            {segments[0] === 'topic' ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  {decodeURIComponent(segments[1])}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <BreadcrumbLink href="/topic/realtime">
                    <DropdownMenuItem>realtime</DropdownMenuItem>
                  </BreadcrumbLink>
                  <BreadcrumbLink
                    href={`/topic/daily/${dayjs(date).format('YYYY-MM-DD')}`}
                  >
                    <DropdownMenuItem>daily</DropdownMenuItem>
                  </BreadcrumbLink>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              decodeURIComponent(segments[1])
            )}
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
