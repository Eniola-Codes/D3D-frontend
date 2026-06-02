'use client';

import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SearchForm } from '@/components/ui/search-form';
import { useProductFilters } from '@/components/dashboard/find-products/hooks/use-product-filters';
import { sortOptions, priceOptions } from '@/lib/data/product';
import { ProductListFilter } from '@/interfaces/product';
import Image from 'next/image';
import { getBrandInitials } from '@/lib/utils/dashboard/brand';

export function ProductFilter({
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
  const {
    filters,
    categoryQuery,
    setCategoryQuery,
    categoryMatches,
    brandQuery,
    setBrandQuery,
    brandMatches,
    hasActiveFilters,
    handleFilterChange,
    handleResetFilters,
  } = useProductFilters({
    search,
    category,
    brand,
    price,
    sort,
    filterOptions,
  });

  return (
    <div className="bg-background border-border sticky top-0 z-10 w-full border-b">
      <div className="mx-auto max-w-[100rem] px-4 py-3 sm:py-4 lg:px-6">
        <div className="flex flex-row items-center gap-2">
          <SearchForm
            className="w-full flex-1"
            value={filters.search}
            onChange={e => handleFilterChange('search', e.target.value)}
          />
          <button
            onClick={handleResetFilters}
            disabled={!hasActiveFilters}
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
                <div className="p-1">
                  <input
                    value={categoryQuery}
                    onChange={e => setCategoryQuery(e.target.value)}
                    onKeyDown={e => e.stopPropagation()}
                    placeholder="Search categories..."
                    className="border-border bg-background text-foreground focus:ring-ring w-full rounded-sm border px-3 py-2 text-sm outline-none focus:ring-1"
                  />
                </div>
                <DropdownMenuItem
                  onClick={() => handleFilterChange('category', 'All Categories')}
                  className={`cursor-pointer ${filters.category === 'All Categories' ? 'bg-accent' : ''}`}
                >
                  All Categories
                </DropdownMenuItem>
                {categoryMatches.map(option => (
                  <DropdownMenuItem
                    key={option._id}
                    onClick={() => handleFilterChange('category', option.title)}
                    className={`cursor-pointer ${filters.category === option.title ? 'bg-accent' : ''}`}
                  >
                    {option.title}
                  </DropdownMenuItem>
                ))}
                {categoryMatches.length === 0 && (
                  <div className="text-muted-foreground px-3 py-2 text-sm">
                    No matching categories
                  </div>
                )}
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
                <div className="p-1">
                  <input
                    value={brandQuery}
                    onChange={e => setBrandQuery(e.target.value)}
                    onKeyDown={e => e.stopPropagation()}
                    placeholder="Search brands..."
                    className="border-border bg-background text-foreground focus:ring-ring w-full rounded-sm border px-3 py-2 text-sm outline-none focus:ring-1"
                  />
                </div>
                <DropdownMenuItem
                  onClick={() => handleFilterChange('brand', 'All Brands')}
                  className={`cursor-pointer ${filters.brand === 'All Brands' ? 'bg-accent' : ''}`}
                >
                  All Brands
                </DropdownMenuItem>
                {brandMatches.map((option) => {
                  const initials = getBrandInitials(option.title);
                  return (
                    <DropdownMenuItem
                      key={option._id}
                      onClick={() => handleFilterChange('brand', option.title)}
                      className={`cursor-pointer ${filters.brand === option.title ? 'bg-accent' : ''}`}
                    >
                      <div className="flex items-center gap-2">
                        {option.logo ? (
                          <Image
                            className="rounded-sm object-contain"
                            src={option.logo}
                            alt={option.title}
                            width={20}
                            height={20}
                          />
                        ) : <span className='inline-block bg-gray-200 rounded-full py-[1px] px-1.5 text-sm font-semibold text-neutral-700'>{initials}</span>
                        }
                        <span>{option.title}</span>
                      </div>
                    </DropdownMenuItem>
                  )
                })}
                {brandMatches.length === 0 && (
                  <div className="text-muted-foreground px-3 py-2 text-sm">No matching brands</div>
                )}
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
                    className={`cursor-pointer ${filters.price === option ? 'bg-accent' : ''}`}
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
                    className={`cursor-pointer ${filters.sort === option ? 'bg-accent' : ''}`}
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <button
            onClick={handleResetFilters}
            disabled={!hasActiveFilters}
            className="ml-2 hidden w-20 min-w-20 cursor-pointer rounded-sm bg-gray-900 py-2 text-sm whitespace-nowrap text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400 sm:block xl:ml-3"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
