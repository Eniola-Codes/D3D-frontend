'use client';

import { useState } from 'react';
import { ChevronDown, Flame } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SearchForm } from '@/components/ui/search-form';
import { useIsTablet } from '@/components/dashboard/layout/hooks/use-breakpoints';
import {
  categoryOptions,
  sortOptions,
  brandOptions,
  priceOptions,
  trendingCatgories,
} from '@/lib/data/product';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Pill from '@/components/ui/pill';

export function ProductFilter({
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
    category: category || 'All Categories',
    sort: sort || 'Relevance',
    brand: brand || 'All Brands',
    price: price || 'All Prices',
  });
  const isTablet = useIsTablet();
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
          value === 'Relevance'))
    ) {
      params.delete(filterKey);
    } else {
      params.set(filterKey, value);
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      category: 'All Categories',
      sort: 'Relevance',
      brand: 'All Brands',
      price: 'All Prices',
    });

    router.replace(pathname);
  };

  return (
    <div className="bg-background border-border sticky top-0 z-40 w-full border-b">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <div className="flex flex-row items-center gap-2">
          <SearchForm
            className="w-full flex-1"
            value={filters.search}
            onChange={e => handleFilterChange('search', e.target.value)}
          />
          <Flame className="fill-accent-foreground hidden size-5 sm:flex" />
          <div className="hidden flex-wrap items-center gap-2 sm:flex xl:gap-3">
            {trendingCatgories.slice(0, isTablet ? 3 : 6).map(option => (
              <Pill
                key={option}
                option={option}
                handleFilterChange={handleFilterChange}
                search={filters.search}
              />
            ))}
          </div>
          <Flame className="fill-accent-foreground hidden size-5 sm:flex" />
          <button
            onClick={handleResetFilters}
            disabled={!searchParams.toString()}
            className="w-20 min-w-20 cursor-pointer rounded-sm bg-gray-900 py-2 text-sm whitespace-nowrap text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400 sm:hidden"
          >
            Reset
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between sm:mt-4 sm:flex-row">
          <div className="flex w-full items-center gap-2 xl:gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="bg-card border-border hover:bg-accent/10 flex w-full cursor-pointer items-center justify-between overflow-hidden rounded-lg border px-4 py-2 transition-colors">
                  <span className="text-foreground truncate text-sm font-medium">
                    {filters.category}
                  </span>
                  <ChevronDown className="text-muted-foreground ml-2 h-4 w-4 flex-shrink-0" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {categoryOptions.map(option => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => handleFilterChange('category', option)}
                    className={filters.category === option ? 'bg-accent' : ''}
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="bg-card border-border hover:bg-accent/10 flex w-full cursor-pointer items-center justify-between overflow-hidden rounded-lg border px-4 py-2 transition-colors">
                  <span className="text-foreground truncate text-sm font-medium">
                    {filters.brand}
                  </span>
                  <ChevronDown className="text-muted-foreground ml-2 h-4 w-4 flex-shrink-0" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {brandOptions.map(option => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => handleFilterChange('brand', option)}
                    className={filters.brand === option ? 'bg-accent' : ''}
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="bg-card border-border hover:bg-accent/10 flex w-full cursor-pointer items-center justify-between overflow-hidden rounded-lg border px-4 py-2 transition-colors">
                  <span className="text-foreground truncate text-sm font-medium">
                    {filters.price}
                  </span>
                  <ChevronDown className="text-muted-foreground ml-2 h-4 w-4 flex-shrink-0" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {priceOptions.map(option => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => handleFilterChange('price', option)}
                    className={filters.price === option ? 'bg-accent' : ''}
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="bg-card border-border hover:bg-accent/10 flex w-full cursor-pointer items-center justify-between overflow-hidden rounded-lg border px-4 py-2 transition-colors">
                  <span className="text-foreground truncate text-sm font-medium">
                    Sort: {filters.sort}
                  </span>
                  <ChevronDown className="text-muted-foreground ml-2 h-4 w-4 flex-shrink-0" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {sortOptions.map(option => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => handleFilterChange('sort', option)}
                    className={filters.sort === option ? 'bg-accent' : ''}
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <button
            onClick={handleResetFilters}
            disabled={!searchParams.toString()}
            className="ml-2 hidden w-20 min-w-20 cursor-pointer rounded-sm bg-gray-900 py-2 text-sm whitespace-nowrap text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400 sm:block xl:ml-3"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
