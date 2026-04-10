'use client';

import React, { ReactNode } from 'react';
import { AppSidebar } from '@/components/dashboard/layout/components/sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Navbar } from '@/components/dashboard/layout/components/navbar';
import { userStore } from '@/store/user';
import { IUser } from '@/interfaces/user';

const DashboardLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const user = userStore(state => state.user) as IUser;

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <Navbar user={user} />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
