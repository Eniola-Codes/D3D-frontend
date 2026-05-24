import { routes } from '@/lib/constants/page-routes';
export const getRating = ({ rating }: { rating: number }) => {
  const ratingText = `${'★'.repeat(Math.round(rating))} ${rating.toFixed(1)}`;

  return {
    ratingText,
  };
};

export function buildProductSearchParams(searchParams: {
  [key: string]: string | string[] | undefined;
}): URLSearchParams {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParams)) {
    if (typeof value !== 'string' || value === '') continue;
    params.set(key, value);
  }

  return params;
}

const productsPath = `${routes.dashboard.path.base}${routes.dashboard.path.findProducts}`;

export function buildProductsPageUrl(searchParams: URLSearchParams, page: number): string {
  const params = new URLSearchParams(searchParams);

  if (page <= 1) {
    params.delete('page');
  } else {
    params.set('page', String(page));
  }

  const query = params.toString();
  return query ? `${productsPath}?${query}` : productsPath;
}

export function getPaginationRange(
  currentPage: number,
  totalPages: number
): (number | 'ellipsis')[] {
  if (totalPages <= 3) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages: (number | 'ellipsis')[] = [1];

  const showLeadingEllipsis = currentPage > 3;
  const showTrailingEllipsis = currentPage < totalPages - 2;

  if (showLeadingEllipsis) {
    pages.push('ellipsis');
  }

  const rangeStart = showLeadingEllipsis ? currentPage - 1 : 2;
  const rangeEnd = showTrailingEllipsis ? currentPage + 1 : totalPages - 1;

  for (let p = rangeStart; p <= rangeEnd; p++) {
    pages.push(p);
  }

  if (showTrailingEllipsis) {
    pages.push('ellipsis');
  }

  pages.push(totalPages);

  return pages;
}
