import { routes } from '@/lib/constants/page-routes';
import { labelMap } from '@/lib/data/layout';

export const toTitle = (input: string) => {
  return input
    .replace(/[-_]/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, c => c.toUpperCase());
};

export const getBreadcrumbLabel = (segments: string[], segment: string, index: number) => {
  const href = '/' + segments.slice(0, index + 1).join('/');
  const isLast = index === segments.length - 1;
  const label = labelMap[segment] ?? segment.charAt(0).toUpperCase() + segment.slice(1);
  return { href, isLast, label };
};

export const isActive = (url: string, pathname: string) => {
  if (url === routes.dashboard.path.base) {
    return pathname === url;
  }
  return pathname === url || pathname.startsWith(`${url}/`);
};
