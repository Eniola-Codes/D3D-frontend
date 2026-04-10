'use client';

import * as React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { SidebarLinks } from './sidebar-links';
import { SidebarStore } from './sidebar-store';
import { SiDatabricks } from 'react-icons/si';
import type { IUser } from '../../../../interfaces/user';
import { sidebarNavData } from '@/lib/data/layout';
import Link from 'next/link';
import { routes } from '@/lib/constants/page-routes';

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  user?: IUser;
};

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={routes.dashboard.path.base}>
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <SiDatabricks className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">d3d</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {Object.entries(sidebarNavData).map(([groupName, items]) => (
          <SidebarLinks key={groupName} groupName={groupName} items={items} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarStore user={user as IUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
