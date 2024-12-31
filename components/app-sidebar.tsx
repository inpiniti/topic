'use client';

import * as React from 'react';
import {
  AudioWaveform,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
} from 'lucide-react';

import { Calendar } from '@/components/ui/calendar';

import { NavMain } from '@/components/nav-main';
import { TeamSwitcher } from '@/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { useDateStore } from '@/app/store/dateStore';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className="divide-y border-t">
        <CalendarComponent />
        <NavMain />
      </SidebarContent>
      <SidebarFooter>footer</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

const CalendarComponent = () => {
  const { date, setDate } = useDateStore();
  const router = useRouter();

  // 날짜 변경
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setDate(date);
      router.push(`/topic/daily/${dayjs(date).format('YYYY-MM-DD')}`);
    }
  };

  return <Calendar mode="single" selected={date} onSelect={handleDateChange} />;
};
