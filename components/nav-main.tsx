"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { MessageCircle, TableOfContents } from "lucide-react";

export function NavMain() {
  return (
    <Tabs defaultValue="community">
      <div className="pt-4 pl-4">
        <TabsList>
          <TabsTrigger value="community">Community</TabsTrigger>
          <TabsTrigger value="news">News</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="community">
        <Community />
      </TabsContent>
      <TabsContent value="news">
        <News />
      </TabsContent>
    </Tabs>
  );
}

const Community = () => {
  const navMain = [
    {
      title: "디시인사이드",
      url: "dcinside.com",
      icon: MessageCircle,
      isActive: true,
    },
    {
      title: "에펨코리아",
      url: "fmkorea.com",
      icon: TableOfContents,
    },
    {
      title: "더쿠",
      url: "theqoo.net",
      icon: TableOfContents,
    },
    {
      title: "인벤",
      url: "inven.co.kr",
      icon: TableOfContents,
    },
    {
      title: "엠팍(엠엘비파크)",
      url: "mlbpark.donga.com",
      icon: TableOfContents,
    },
    {
      title: "뽐뿌",
      url: "ppomppu.co.kr",
      icon: TableOfContents,
    },
    {
      title: "루리웹",
      url: "/board",
      icon: TableOfContents,
    },
    {
      title: "네이트판",
      url: "/board",
      icon: TableOfContents,
    },
    {
      title: "아카라이브",
      url: "/board",
      icon: TableOfContents,
    },
    {
      title: "클리앙",
      url: "/board",
      icon: TableOfContents,
    },
    {
      title: "일베(일간베스트)",
      url: "/board",
      icon: TableOfContents,
    },
    {
      title: "인스티즈",
      url: "/board",
      icon: TableOfContents,
    },
    {
      title: "보배드림",
      url: "/board",
      icon: TableOfContents,
    },
    {
      title: "웃긴대학",
      url: "/board",
      icon: TableOfContents,
    },
    {
      title: "이토렌트",
      url: "/board",
      icon: TableOfContents,
    },
    {
      title: "82쿡",
      url: "/board",
      icon: TableOfContents,
    },
    {
      title: "다모앙",
      url: "/board",
      icon: TableOfContents,
    },
    {
      title: "에스엘알클럽",
      url: "/board",
      icon: TableOfContents,
    },
    {
      title: "가생이닷컴",
      url: "/board",
      icon: TableOfContents,
    },
    {
      title: "오르비",
      url: "/board",
      icon: TableOfContents,
    },
    {
      title: "해연갤",
      url: "/board",
      icon: TableOfContents,
    },
    {
      title: "오늘의유머",
      url: "/board",
      icon: TableOfContents,
    },
    {
      title: "힙합엘이",
      url: "/board",
      icon: TableOfContents,
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Community</SidebarGroupLabel>
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
                </SidebarMenuButton>
              </CollapsibleTrigger>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

const News = () => {
  const navMain = [
    {
      title: "경향신문",
      url: "/board",
      icon: MessageCircle,
      isActive: true,
    },
    {
      title: "국민일보",
      url: "/board",
      icon: TableOfContents,
    },
    {
      title: "문화일보",
      url: "/board",
      icon: TableOfContents,
    },
    {
      title: "동아일보",
      url: "/board",
      icon: TableOfContents,
    },
    {
      title: "한국일보",
      url: "/board",
      icon: TableOfContents,
    },
    {
      title: "중앙일보",
      url: "/board",
      icon: TableOfContents,
    },
    {
      title: "서울신문",
      url: "/board",
      icon: TableOfContents,
    },
    {
      title: "세계일보",
      url: "/board",
      icon: TableOfContents,
    },
    {
      title: "한겨레",
      url: "/board",
      icon: TableOfContents,
    },
    {
      title: "조선일보",
      url: "/board",
      icon: TableOfContents,
    },
    {
      title: "한국경제TV",
      url: "/board",
      icon: TableOfContents,
    },
    {
      title: "MBC",
      url: "/board",
      icon: TableOfContents,
    },
    {
      title: "JTBC",
      url: "/board",
      icon: TableOfContents,
    },
    {
      title: "MBN",
      url: "/board",
      icon: TableOfContents,
    },
    {
      title: "TB조선",
      url: "/board",
      icon: TableOfContents,
    },
    {
      title: "채널A",
      url: "/board",
      icon: TableOfContents,
    },
    {
      title: "연합뉴스",
      url: "/board",
      icon: TableOfContents,
    },
    {
      title: "SBS Biz",
      url: "/board",
      icon: TableOfContents,
    },
    {
      title: "SBS",
      url: "/board",
      icon: TableOfContents,
    },
    {
      title: "YTN",
      url: "/board",
      icon: TableOfContents,
    },
    {
      title: "뉴스1",
      url: "/board",
      icon: TableOfContents,
    },
    {
      title: "뉴시스",
      url: "/board",
      icon: TableOfContents,
    },
    {
      title: "연합뉴스TV",
      url: "/board",
      icon: TableOfContents,
    },
    {
      title: "KBS",
      url: "/board",
      icon: TableOfContents,
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>News</SidebarGroupLabel>
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
                </SidebarMenuButton>
              </CollapsibleTrigger>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};
