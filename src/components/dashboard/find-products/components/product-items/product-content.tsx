import EmptyState from '@/components/dashboard/find-products/components/product-items/empty-state';
import { ProductPagination } from '@/components/dashboard/find-products/components/product-items/product-pagination';
import ProductList from '@/components/dashboard/find-products/components/product-items/product-list';
import { ProductListResponse } from '@/interfaces/product';
import { endpoints } from '@/lib/constants/endpoints';
import { apiServerService } from '@/lib/services/api/server';

export async function ProductContent({ params }: { params: URLSearchParams }) {
  try {
    const response = await apiServerService.get<ProductListResponse>(
      `${endpoints.products.base}${endpoints.products.getProducts}?${params.toString()}`
    );

    if (response.products.length === 0) {
      return <EmptyState />;
    }

    return (
      <>
        <ProductList products={response.products} />
        <ProductPagination pagination={response.pagination} searchParams={params} />
      </>
    );
  } catch {
    return <EmptyState />;
  }
}
