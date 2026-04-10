'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SearchForm } from '@/components/ui/search-form';
import { Slider } from '@/components/ui/slider';
import { useIsTablet } from '@/components/dashboard/layout/hooks/use-breakpoints';
import { categoryOptions, sortOptions, brandOptions } from '@/lib/data/product';

export function ProductFilter() {
  const [filters, setFilters] = useState({
    search: '',
    priceRange: [0, 1000],
    category: 'All Categories',
    sort: 'Sort by',
    brand: 'All Brands',
  });
  const [filterIsActive, setFilterIsActive] = useState(false);
  const isTablet = useIsTablet();

  const handleFilterChange = (filterKey: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: value,
    }));

    if (!filterIsActive) {
      setFilterIsActive(true);
    }
  };

  const handlePriceChange = (values: number[]) => {
    setFilters(prev => ({
      ...prev,
      priceRange: values,
    }));
    if (!filterIsActive) {
      setFilterIsActive(true);
    }
  };

  const handleSearchChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      search: value,
    }));
    if (!filterIsActive) {
      setFilterIsActive(true);
    }
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      priceRange: [0, 1000],
      category: 'All Categories',
      sort: 'Sort by',
      brand: 'All Brands',
    });

    if (filterIsActive) {
      setFilterIsActive(false);
    }
  };

  return (
    <div className="bg-background border-border sticky top-0 z-40 w-full border-b">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center xl:gap-3">
          <SearchForm
            className="w-full flex-1"
            value={filters.search}
            onChange={e => handleSearchChange(e.target.value)}
          />

          <div className="hidden flex-wrap items-center gap-2 sm:flex xl:gap-3">
            {categoryOptions.slice(0, isTablet ? 3 : 6).map(option => (
              <button
                key={option}
                onClick={() => handleFilterChange('category', option)}
                className={`cursor-pointer rounded-sm px-3 py-1.5 text-sm font-medium transition-all ${
                  filters.category === option
                    ? 'bg-accent text-accent-foreground border-accent border'
                    : 'bg-card text-foreground border-border hover:bg-accent/10 border'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3 flex items-stretch justify-between sm:mt-4 sm:flex-row lg:items-center">
          <div className="flex items-center gap-2 xl:gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="bg-card border-border hover:bg-accent/10 flex cursor-pointer items-center justify-between rounded-lg border px-4 py-2 transition-colors">
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
                <button className="bg-card border-border hover:bg-accent/10 flex cursor-pointer items-center justify-between rounded-lg border px-4 py-2 transition-colors">
                  <span className="text-foreground truncate text-sm font-medium">
                    {filters.sort}
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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="bg-card border-border hover:bg-accent/10 hidden cursor-pointer items-center justify-between rounded-lg border px-4 py-2 transition-colors sm:flex">
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

            <div className="flex min-w-24 flex-col gap-3 lg:min-w-50">
              <Slider
                min={0}
                max={1000}
                step={10}
                value={filters.priceRange}
                onValueChange={handlePriceChange}
                className="w-full pt-1"
              />
              <div className="text-muted-foreground flex justify-between px-1 text-xs">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>
          </div>

          {filterIsActive && (
            <button
              onClick={handleResetFilters}
              className="fixed right-8 bottom-8 ml-4 w-20 cursor-pointer rounded-sm bg-gray-900 py-1.5 text-sm whitespace-nowrap text-white transition-colors hover:bg-gray-800 sm:static sm:block"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
