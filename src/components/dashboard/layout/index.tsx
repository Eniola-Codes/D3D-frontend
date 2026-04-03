'use client';

import React, { ReactNode } from 'react';
import { AppSidebar } from '@/components/dashboard/layout/sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Navbar } from '@/components/dashboard/layout/navbar';
import { userStore } from '@/store/user';

const DashboardLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const user = userStore(state => state.user);

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <Navbar />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
