import clsx from 'clsx';
import { Skeleton } from '@/components/ui/skeleton';

export function ProductItemSkeleton() {
  return (
    <div
      className={clsx(
        'flex h-full w-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white dark:bg-black'
      )}
    >
      <Skeleton className="h-50 w-full shrink-0 rounded-none" />
      <div className="w-full border-t bg-white p-4 dark:bg-black">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <Skeleton className="h-5 w-5 shrink-0 rounded" />
            <Skeleton className="h-4 min-w-0 flex-1" />
          </div>
          <Skeleton className="size-5 shrink-0 rounded" />
        </div>
        <Skeleton className="mt-4 h-5 w-28" />
        <div className="mt-2 flex items-center justify-between">
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
    </div>
  );
}
