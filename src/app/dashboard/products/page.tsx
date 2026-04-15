import EmptyState from '@/components/dashboard/find-products/components/product-listing/empty-state';
import { ProductFilter } from '@/components/dashboard/find-products/components/product-listing/product-filters';
import ProductList from '@/components/dashboard/find-products/components/product-listing/product-list';
import DashboardLayout from '@/components/dashboard/layout/components';
import { dummyProducts } from '@/lib/data/product';
import { filterProducts } from '@/lib/utils/dashboard/product/filter';

export default async function SearchPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const { search, sort, category, brand, price } = searchParams as { [key: string]: string };

  const filteredProducts = filterProducts(dummyProducts, {
    search,
    category,
    brand,
    price,
    sort,
  });

  return (
    <DashboardLayout>
      <ProductFilter search={search} category={category} brand={brand} price={price} sort={sort} />
      {filteredProducts.length > 0 ? (
        <div className="grid grid-flow-row grid-cols-2 gap-3 px-4 py-5 lg:grid-cols-3 lg:gap-5 lg:px-10 xl:grid-cols-4">
          <ProductList products={filteredProducts} />
        </div>
      ) : (
        <EmptyState />
      )}
    </DashboardLayout>
  );
}
