"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import useRangeStore from "@/app/store/rangeStore";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      key: string;
      url: string;
    }[];
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
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
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
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
        key: string;
        url: string;
      }[];
}) => {
  const { range, setRange } = useRangeStore();
  // 범위 변경
  const handleRangeChange = (key: string) => {
    console.log("handleRangeChange");
    setRange(key);
  };

  return (
    <SidebarMenuSub>
      {items?.map((subItem) => (
        <SidebarMenuSubItem key={subItem.title}>
          <SidebarMenuSubButton asChild>
            <a
              onClick={() => handleRangeChange(subItem.key)}
              className={`${
                range === subItem.key ? "bg-black text-white" : ""
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
