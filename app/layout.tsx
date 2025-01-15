"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { QueryClient, QueryClientProvider } from "react-query";
import Breadcrumbs from "./breadcrumbs";
import { SquareChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Wrap } from "@/components/wrap";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  // 뒤로 가기 클릭
  const backButtonClick = () => {
    router.back();
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider client={queryClient}>
          <SidebarProvider>
            <Wrap title="AppSidebar">
              <AppSidebar />
            </Wrap>
            <SidebarInset>
              <div className="flex flex-col h-screen overflow-hidden">
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                  <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Wrap title="SquareChevronLeft">
                      <SquareChevronLeft
                        className="cursor-pointer w-7 h-7 p-1.5 hover:bg-neutral-100 rounded"
                        onClick={backButtonClick}
                      />
                    </Wrap>
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumbs />
                  </div>
                </header>
                <div className="flex divide-x h-full overflow-hidden grow">
                  <ScrollArea>
                    <List />
                  </ScrollArea>
                  <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {children}
                  </div>
                </div>
              </div>
            </SidebarInset>
          </SidebarProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}

const List = () => {
  return (
    <div className="flex flex-col">
      {Array.from({ length: 100 }, (_, i) => (
        <div key={i} className="p-4 bg-neutral-100">
          Item {i + 1}
        </div>
      ))}
    </div>
  );
};
