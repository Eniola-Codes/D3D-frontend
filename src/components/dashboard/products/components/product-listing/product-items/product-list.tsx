import { ProductItem } from './product-item';
import { ProductListItem } from '../../../../../../interfaces/product';
import Link from 'next/link';
import { routes } from '@/lib/constants/page-routes';

export default function ProductList({ products }: { products: ProductListItem[] }) {
  return (
    <div
      className="mx-auto grid w-full max-w-400 grid-flow-row grid-cols-2 gap-3 px-3 pt-3 pb-5 lg:grid-cols-3 lg:gap-5 lg:px-5 lg:pt-5 lg:pb-8 xl:grid-cols-4 2xl:grid-cols-6"
      id="product-list"
    >
      {products.map((product, index) => (
        <div key={product.handle} className="group animate-fadeIn relative transition-opacity">
          <Link
            href={`${routes.dashboard.path.base}${routes.dashboard.path.myProducts}/${product.handle}`}
            aria-label={product.title}
            className="absolute inset-0 z-0 rounded-lg"
          />
          <ProductItem
            handle={product.handle}
            title={product.title}
            src={product.featuredImage}
            description={product.shortDescription}
            options={product.options}
            brand={product.brand}
            price={product.priceRange}
            priority={index < 4}
          />
        </div>
      ))}
    </div>
  );
}
