import EmptyState from '@/components/dashboard/products/components/product-listing/product-items/empty-state';
import { ProductPagination } from '@/components/dashboard/products/components/product-listing/product-items/product-pagination';
import ProductList from '@/components/dashboard/products/components/product-listing/product-items/product-list';
import { ProductListResponse } from '@/interfaces/product';

export function ProductContent({
  params,
  response,
}: {
  params: URLSearchParams;
  response: ProductListResponse;
}) {
  if (response.products.length === 0) {
    const hasActiveFilters = [...params.keys()].some(key => key !== 'page');
    return <EmptyState hasActiveFilters={hasActiveFilters} />;
  }

  return (
    <>
      <ProductList products={response.products} />
      <ProductPagination pagination={response.pagination} searchParams={params} />
    </>
  );
}
