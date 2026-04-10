import { ProductFilter } from '@/components/dashboard/find-products/components/product-listing/product-filters';
import ProductList from '@/components/dashboard/find-products/components/product-listing/product-list';
import DashboardLayout from '@/components/dashboard/layout/components';
import { dummyProducts } from '@/lib/data/product';

export const metadata = {
  title: 'Search',
  description: 'Search for products in the store.',
};

export default async function SearchPage() {
  return (
    <DashboardLayout>
      <ProductFilter />
      {dummyProducts.length > 0 ? (
        <div className="grid grid-flow-row grid-cols-2 gap-3 px-4 py-5 lg:grid-cols-3 lg:gap-5 lg:px-10 xl:grid-cols-4">
          <ProductList products={dummyProducts} />
        </div>
      ) : null}
    </DashboardLayout>
  );
}
