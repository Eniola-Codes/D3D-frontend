'use client';

import { ChevronsUpDown, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import type { IUser } from '../../../../interfaces/user';
import { SiShopify } from 'react-icons/si';
import { useIsMobile } from '../hooks/use-breakpoints';

export function SidebarStore({ user }: { user: IUser }) {
  const isMobile = useIsMobile();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {user.name && user.email && (
              <SidebarMenuButton
                data-testid="shopify-menu-trigger"
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foregroun focus:outline-none focus-visible:ring-0 focus-visible:outline-none"
              >
                <SiShopify className="h-6 w-6" />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <p className="flex items-center gap-2 truncate font-medium">
                    <span>Shopify Connected</span>
                    <span className="relative flex size-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-50" />
                      <span className="relative m-auto inline-flex size-2 rounded-full bg-green-500" />
                    </span>
                  </p>
                  <span className="truncate text-xs">eniolacodes.myshopify.com</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'top' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuItem>
              <LogOut className="text-red-500" />
              Disconnect Shopify
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <button className="w-full cursor-pointer rounded-sm bg-gray-900 py-1.5 text-sm whitespace-nowrap text-white transition-colors hover:bg-gray-800 sm:block">
          Connect to Shopify
        </button>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
