import { ProductItemSkeleton } from './product-item-skeleton';

const SKELETON_ITEM_COUNT = 12;

export function ProductItemsSkeleton() {
  return (
    <div className="mx-auto grid w-full max-w-[100rem] grid-flow-row grid-cols-2 gap-3 px-4 py-5 lg:grid-cols-3 lg:gap-5 lg:px-6 xl:grid-cols-4 2xl:grid-cols-6">
      {Array.from({ length: SKELETON_ITEM_COUNT }).map((_, index) => (
        <div key={index}>
          <ProductItemSkeleton />
        </div>
      ))}
    </div>
  );
}
