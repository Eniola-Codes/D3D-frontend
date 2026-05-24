import { ProductFilter } from '@/components/dashboard/find-products/components/product-filters/product-filters';
import { ProductContent } from '@/components/dashboard/find-products/components/product-items/product-content';
import DashboardLayout from '@/components/dashboard/layout/components';
import { buildProductSearchParams } from '@/lib/utils/dashboard/product';

export default async function SearchPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const { search, sort, category, brand, price } = searchParams as { [key: string]: string };
  const params = buildProductSearchParams(searchParams);

  return (
    <DashboardLayout>
      <ProductFilter search={search} category={category} brand={brand} price={price} sort={sort} />
      <ProductContent params={params} />
    </DashboardLayout>
  );
}
