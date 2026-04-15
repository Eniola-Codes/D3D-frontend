import { Search } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="absolute top-1/2 flex w-full -translate-y-1/2 items-center justify-center px-4">
      <div className="max-w-md space-y-6 text-center">
        <div className="flex justify-center">
          <div className="bg-muted flex h-20 w-20 items-center justify-center rounded-full">
            <Search className="text-muted-foreground h-10 w-10" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-foreground text-xl font-bold sm:text-2xl">No Products Found</h3>
          <p className="text-muted-foreground text-sm sm:text-base">
            We couldn&apos;t find any products matching your filters. Try adjusting your search criteria.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
