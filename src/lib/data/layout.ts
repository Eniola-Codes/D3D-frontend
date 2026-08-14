import { BadgeCheck, Headset, Home, MessageCircleMore, Pickaxe, ShoppingCart } from 'lucide-react';
import { routes } from '../constants/page-routes';

export const sidebarNavData = {
  gettingStarted: [
    {
      name: 'Home',
      url: routes.dashboard.path.base,
      icon: Home,
    },
  ],
  discover: [
    {
      name: 'Extract Products',
      url: '#',
      icon: Pickaxe,
    },
  ],
  myStore: [
    {
      name: 'My Products',
      url: `${routes.dashboard.path.base}${routes.dashboard.path.myProducts}`,
      icon: ShoppingCart,
    },
  ],
};

export const menuItems = [
  { label: 'Account', icon: BadgeCheck, url: '/account' },
  { label: 'Support', icon: Headset, url: '/support' },
  { label: 'Feedback', icon: MessageCircleMore, url: '/feedback' },
];

export const SIDEBAR_COOKIE_NAME = 'sidebar_state';
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
export const SIDEBAR_WIDTH = '15rem';
export const SIDEBAR_TABLET_WIDTH = '12rem';
export const SIDEBAR_MOBILE_WIDTH = '16rem';
export const SIDEBAR_WIDTH_ICON = '3rem';
export const MOBILE_BREAKPOINT = 640;
export const TABLET_BREAKPOINT = 1024;

export const labelMap: Record<string, string> = {
  dashboard: 'Dashboard',
  products: 'My Products',
};
