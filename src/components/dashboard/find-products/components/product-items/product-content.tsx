import EmptyState from '@/components/dashboard/find-products/components/product-items/empty-state';
import { ProductPagination } from '@/components/dashboard/find-products/components/product-items/product-pagination';
import ProductList from '@/components/dashboard/find-products/components/product-items/product-list';
import { ProductListResponse } from '@/interfaces/product';

export function ProductContent({
  params,
  response,
}: {
  params: URLSearchParams;
  response: ProductListResponse;
}) {
  if (response.products.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <ProductList products={response.products} />
      <ProductPagination pagination={response.pagination} searchParams={params} />
    </>
  );
}
