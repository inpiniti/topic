"use client";

import * as React from "react";

import { Calendar } from "@/components/ui/calendar";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useDateStore } from "@/app/store/dateStore";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { Wrap } from "./Wrap";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent className="divide-y border-t">
        <Wrap title="CalendarComponent">
          <CalendarComponent />
        </Wrap>
        <Wrap title="NavMain">
          <NavMain />
        </Wrap>
      </SidebarContent>
      <Wrap title="SidebarFooter">
        <SidebarFooter>footer</SidebarFooter>
      </Wrap>
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
      router.push(`/topic/daily/${dayjs(date).format("YYYY-MM-DD")}`);
    }
  };

  return <Calendar mode="single" selected={date} onSelect={handleDateChange} />;
};
