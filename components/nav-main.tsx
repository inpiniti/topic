'use client';

import { ChevronRight } from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import useRangeStore from '@/app/store/rangeStore';
import { MessageCircle, TableOfContents } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDateStore } from '@/app/store/dateStore';
import dayjs from 'dayjs';

export function NavMain() {
  const { date } = useDateStore();

  const navMain = [
    {
      title: 'Topics',
      url: '#',
      icon: MessageCircle,
      isActive: true,
      items: [
        {
          title: '실시간 Topics',
          key: 'realtime',
          url: '/topic/realtime',
        },
        {
          title: '일별 Topics',
          key: 'daily',
          url: `/topic/daily/${dayjs(date).format('YYYY-MM-DD')}`,
        },
      ],
    },
    {
      title: '게시판',
      url: '#',
      icon: TableOfContents,
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {navMain.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  {item.items && (
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  )}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <RangeComponent items={item.items || []} />
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

const RangeComponent = ({
  items,
}: {
  items:
    | {
        title: string;
        key?: string;
        url: string;
      }[];
}) => {
  const { range, setRange } = useRangeStore();
  const router = useRouter();
  // 범위 변경
  const handleRangeChange = (key: string, url: string) => {
    setRange(key);
    router.push(url);
  };

  return (
    <SidebarMenuSub>
      {items?.map((subItem) => (
        <SidebarMenuSubItem key={subItem.title}>
          <SidebarMenuSubButton asChild>
            <a
              onClick={() =>
                handleRangeChange(String(subItem?.key), subItem.url)
              }
              className={`${
                range === subItem.key
                  ? 'bg-black hover:bg-neutral-700 text-white hover:text-white'
                  : ''
              } cursor-pointer`}
            >
              <span>{subItem.title}</span>
            </a>
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      ))}
    </SidebarMenuSub>
  );
};
