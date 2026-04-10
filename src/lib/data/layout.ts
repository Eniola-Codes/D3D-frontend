import {
  BadgeCheck,
  Box,
  Headset,
  Home,
  List,
  MessageCircleMore,
  Pickaxe,
  Search,
} from 'lucide-react';
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
    {
      name: 'Find Products',
      url: `${routes.dashboard.path.base}${routes.dashboard.path.findProducts}`,
      icon: Search,
    },
  ],
  myStore: [
    {
      name: 'My Products',
      url: '#',
      icon: Box,
    },
    {
      name: 'Import List',
      url: '#',
      icon: List,
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
  products: 'Find products',
};
