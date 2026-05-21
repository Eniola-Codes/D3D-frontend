import { ProductFilter } from '@/components/dashboard/find-products/components/product-filters/product-filters';
import { ProductsData } from '@/components/dashboard/find-products/components/product-items/products-data';
import { ProductItemsSkeleton } from '@/components/dashboard/find-products/components/products-loading-ui/product-items-skeleton';
import DashboardLayout from '@/components/dashboard/layout/components';
import { Suspense } from 'react';

export default async function SearchPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const { search, sort, category, brand, price } = searchParams as { [key: string]: string };

  return (
    <DashboardLayout>
      <ProductFilter search={search} category={category} brand={brand} price={price} sort={sort} />
      <Suspense fallback={<ProductItemsSkeleton />}>
        <ProductsData />
      </Suspense>
    </DashboardLayout>
  );
}
