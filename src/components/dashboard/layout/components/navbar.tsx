'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, Sparkles } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getUserInitials } from '@/lib/utils/dashboard/user';
import { useRouter } from 'next/navigation';
import { useLogout } from '@/components/auth/hooks/logout';
import { IUser } from '@/interfaces/user';
import { menuItems } from '@/lib/data/layout';
import { usePathname } from 'next/navigation';
import { getBreadcrumbLabel } from '@/lib/utils/dashboard/layout';
import { useIsMobile } from '../hooks/use-breakpoints';

export function Navbar({ user }: { user: IUser }) {
  const initials = getUserInitials(user.name);
  const router = useRouter();
  const { logoutHandler } = useLogout();
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const segments = pathname.split('/').filter(Boolean);

  return (
    <header className="flex w-full min-w-0 shrink-0 items-center justify-between gap-2 overflow-x-hidden border-b px-4 py-2 sm:px-6 sm:py-3 lg:px-8">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1 md:hidden" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4 md:hidden"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {segments.map((segment, index) => {
              const { href, isLast, label } = getBreadcrumbLabel(segments, segment, index);

              if (isMobile && !isLast) return null;

              return (
                <div key={href} className="flex items-center gap-2">
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator />}
                </div>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-4 sm:gap-6">
        <DropdownMenu>
          <DropdownMenuTrigger data-testid="dropdown-menu-trigger" asChild>
            {user.name && user.email && (
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarImage src={user.avatar ?? ''} alt={user.name} />
                <AvatarFallback className="rounded-full bg-gray-200">{initials}</AvatarFallback>
              </Avatar>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side="bottom"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar ?? ''} alt={user.name} />
                  <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {menuItems.map(item => (
                <DropdownMenuItem
                  key={item.label}
                  onClick={() => {
                    router.push(item.url);
                  }}
                >
                  <item.icon />
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logoutHandler}>
              <LogOut className="text-red-500" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
