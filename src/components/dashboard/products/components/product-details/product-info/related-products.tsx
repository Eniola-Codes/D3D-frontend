import type { RelatedProductsProps } from '@/interfaces/product';
import { ProductItem } from '../../product-listing/product-items/product-item';

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product, index) => (
        <ProductItem
          key={product.id}
          handle={product.handle}
          title={product.title}
          src={product.featuredImage}
          rating={product.rating}
          brand={product.brand}
          price={product.priceRange}
          priority={index < 4}
        />
      ))}
    </div>
  );
}
