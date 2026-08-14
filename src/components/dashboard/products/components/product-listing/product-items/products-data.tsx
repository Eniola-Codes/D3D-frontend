import EmptyState from '@/components/dashboard/products/components/product-listing/product-items/empty-state';
import ProductList from '@/components/dashboard/products/components/product-listing/product-items/product-list';
import { ProductListItem } from '@/interfaces/product';
import { productServerService } from '@/lib/services/product/server';

export async function ProductsData() {
  let products: ProductListItem[] = [];

  try {
    const response = await productServerService.getProducts();
    products = response.products;
  } catch {
    products = [];
  }

  return products.length > 0 ? <ProductList products={products} /> : <EmptyState />;
}
