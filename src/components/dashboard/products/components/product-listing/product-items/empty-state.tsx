import Link from 'next/link';
import { PackageSearch, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { routes } from '@/lib/constants/page-routes';

export default function EmptyState({ hasActiveFilters = false }: { hasActiveFilters?: boolean }) {
  return (
    <div className="absolute top-1/2 flex w-full -translate-y-1/2 items-center justify-center px-4">
      <div className="max-w-md space-y-4 text-center">
        <div className="flex justify-center">
          <div className="bg-muted flex h-20 w-20 items-center justify-center rounded-full">
            {hasActiveFilters ? (
              <Search className="text-muted-foreground h-10 w-10" />
            ) : (
              <PackageSearch className="text-muted-foreground h-10 w-10" />
            )}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-foreground text-xl font-bold sm:text-2xl">No Products Found</h3>
          <p className="text-muted-foreground text-sm sm:text-base">
            {hasActiveFilters
              ? "We couldn't find any products matching your filters. Try adjusting your search criteria."
              : 'Get started by finding products you want to sell, add them to "My Products" and build your catalog.'}
          </p>
        </div>

        {!hasActiveFilters && (
          <Button className="bg-gray-900 py-2 text-white hover:bg-gray-800">
            <Link href={`${routes.dashboard.path.base}${routes.dashboard.path.findProducts}`}>
              Find Products
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
