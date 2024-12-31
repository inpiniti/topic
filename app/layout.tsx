'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Separator } from '@/components/ui/separator';
import { QueryClient, QueryClientProvider } from 'react-query';
import Breadcrumbs from './breadcrumbs';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // page 의 url 이 /topic/daily 이면
  // <BreadcrumbItem>
  //   <BreadcrumbLink href="/">home</BreadcrumbLink>
  // </BreadcrumbItem>
  // <BreadcrumbSeparator />
  // <BreadcrumbItem>
  //   <BreadcrumbPage>daily</BreadcrumbPage>
  // </BreadcrumbItem>

  // page 의 url 이 /topic/realtime 이면
  // <BreadcrumbItem>
  //   <BreadcrumbLink href="/">home</BreadcrumbLink>
  // </BreadcrumbItem>
  // <BreadcrumbSeparator />
  // <BreadcrumbItem>
  //   <BreadcrumbPage>realtime</BreadcrumbPage>
  // </BreadcrumbItem>

  // page 의 url 이 /topic/board 이면
  // <BreadcrumbItem>
  //   <BreadcrumbLink href="/">home</BreadcrumbLink>
  // </BreadcrumbItem>
  // <BreadcrumbSeparator />
  // <BreadcrumbItem>
  //   <BreadcrumbPage>board</BreadcrumbPage>
  // </BreadcrumbItem>

  // 위와 같이 렌더링 되면 좋겠어

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider client={queryClient}>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                  <Breadcrumbs />
                </div>
              </header>
              <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                {children}
              </div>
            </SidebarInset>
          </SidebarProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
