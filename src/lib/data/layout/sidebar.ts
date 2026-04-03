import {
  BadgeCheck,
  Box,
  Headset,
  Heart,
  Home,
  MessageCircleMore,
  Search,
  TrendingUp,
} from 'lucide-react';

export const sidebarNavData = {
  gettingStarted: [
    {
      name: 'Home',
      url: '#',
      icon: Home,
    },
  ],
  discover: [
    {
      name: 'Trending Products',
      url: '#',
      icon: TrendingUp,
    },
    {
      name: 'Find Products',
      url: '#',
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
      name: 'My Wishlist',
      url: '#',
      icon: Heart,
    },
  ],
};

export const menuItems = [
  { label: 'Account', icon: BadgeCheck, url: '/account' },
  { label: 'Support', icon: Headset, url: '/support' },
  { label: 'Feedback', icon: MessageCircleMore, url: '/feedback' },
];
