import { useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ProductListFilter } from '@/interfaces/product';

export function useProductFilters({
  search,
  category,
  brand,
  price,
  sort,
  filterOptions,
}: {
  search: string;
  category: string;
  brand: string;
  price: string;
  sort: string;
  filterOptions: ProductListFilter;
}) {
  const searchParams = useSearchParams();
  const [categoryQuery, setCategoryQuery] = useState('');
  const [brandQuery, setBrandQuery] = useState('');
  const [filters, setFilters] = useState({
    search: search ?? '',
    category: category || 'All Categories',
    sort: sort || 'Newest',
    brand: brand || 'All Brands',
    price: price || 'All Prices',
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
        (value === 'All Categories' ||
          value === 'All Brands' ||
          value === 'All Prices' ||
          value === 'Newest'))
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
      category: 'All Categories',
      sort: 'Newest',
      brand: 'All Brands',
      price: 'All Prices',
    });

    router.replace(pathname);
  };

  const hasActiveFilters =
    (filters.search ?? '') !== '' ||
    filters.category !== 'All Categories' ||
    filters.brand !== 'All Brands' ||
    filters.price !== 'All Prices' ||
    filters.sort !== 'Newest';

  const brandMatches = useMemo(() => {
    if (!brandQuery) {
      return filterOptions.brands.slice(0, 12);
    }
    return filterOptions.brands.filter(option =>
      option.title.toLowerCase().includes(brandQuery.toLowerCase().trim())
    );
  }, [filterOptions.brands, brandQuery]);

  const categoryMatches = useMemo(() => {
    if (!categoryQuery) {
      return filterOptions.categories.slice(0, 12);
    }
    return filterOptions.categories.filter(option =>
      option.title.toLowerCase().includes(categoryQuery.toLowerCase().trim())
    );
  }, [filterOptions.categories, categoryQuery]);

  return {
    filters,
    searchParams,
    categoryQuery,
    setCategoryQuery,
    categoryMatches,
    brandQuery,
    setBrandQuery,
    brandMatches,
    hasActiveFilters,
    handleFilterChange,
    handleResetFilters,
  };
}
