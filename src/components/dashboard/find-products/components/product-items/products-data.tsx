import EmptyState from '@/components/dashboard/find-products/components/product-items/empty-state';
import ProductList from '@/components/dashboard/find-products/components/product-items/product-list';
import { ProductListItem, ProductListResponse } from '@/interfaces/product';
import { endpoints } from '@/lib/constants/endpoints';
import { apiServerService } from '@/lib/services/api/server';

export async function ProductsData() {
  let products: ProductListItem[] = [];

  try {
    const response = await apiServerService.get<ProductListResponse>(
      `${endpoints.products.base}${endpoints.products.getProducts}`
    );
    products = response.products;
  } catch {
    products = [];
  }

  return products.length > 0 ? <ProductList products={products} /> : <EmptyState />;
}
