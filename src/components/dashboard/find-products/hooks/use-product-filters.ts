import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useProductFilters({
  search,
  category,
  brand,
  price,
  sort,
}: {
  search: string;
  category: string;
  brand: string;
  price: string;
  sort: string;
}) {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState({
    search: search,
    category: category || 'Categories',
    sort: sort || 'Latest',
    brand: brand || 'Brands',
    price: price || 'Prices',
  });
  const pathname = usePathname();
  const router = useRouter();

  const handleFilterChange = (filterKey: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: value,
    }));

    const params = new URLSearchParams(searchParams.toString());

    if (
      (filterKey === 'search' && value === '') ||
      (filterKey !== 'search' &&
        (value === 'Categories' || value === 'Brands' || value === 'Prices' || value === 'Latest'))
    ) {
      params.delete(filterKey);
    } else {
      params.set(filterKey, value);
    }

    params.delete('page');

    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      category: 'Categories',
      sort: 'Latest',
      brand: 'Brands',
      price: 'Prices',
    });

    router.replace(pathname);
  };

  const hasActiveFilters =
    filters.search !== '' ||
    filters.category !== 'Categories' ||
    filters.brand !== 'Brands' ||
    filters.price !== 'Prices' ||
    filters.sort !== 'Latest';

  return {
    filters,
    searchParams,
    hasActiveFilters,
    handleFilterChange,
    handleResetFilters,
  };
}
