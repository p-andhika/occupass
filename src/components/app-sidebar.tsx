'use client';

import * as React from 'react';
import { ReceiptText, Users } from 'lucide-react';

import { NavProjects } from '@/components/nav-projects';
import { Sidebar, SidebarContent, SidebarRail } from '@/components/ui/sidebar';

// This is sample data.
const data = {
  menu: [
    {
      name: 'Customers',
      url: '/',
      icon: Users,
    },
    {
      name: 'Orders',
      url: '/orders',
      icon: ReceiptText,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <>
        <SidebarContent>
          <NavProjects projects={data.menu} />
        </SidebarContent>
        <SidebarRail />
      </>
    </Sidebar>
  );
}
