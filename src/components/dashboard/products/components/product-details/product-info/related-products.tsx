import type { Product } from '@/interfaces/product';
import { ProductItem } from '../../product-listing/product-items/product-item';
import Link from 'next/link';
import { routes } from '@/lib/constants/page-routes';

export default function RelatedProducts({ products }: { products: Product[] }) {
  return (
    <div className="mt-8 mb-5">
      <h2 className="text-xl font-semibold">Similar Products</h2>
      <div className="mt-3 flex gap-3 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] lg:gap-5 [&::-webkit-scrollbar]:hidden">
        {products.map((item, index) => (
          <div
            key={item.id}
            className="animate-fadeIn relative min-w-50 transition-opacity md:min-w-72"
          >
            <Link
              href={`${routes.dashboard.path.base}${routes.dashboard.path.myProducts}/${item.handle}`}
              aria-label={item.title}
              className="absolute inset-0 z-0 rounded-lg"
            />
            <ProductItem
              handle={item.handle}
              title={item.title}
              src={item.featuredImage}
              description={item.shortDescription}
              options={item.options}
              brand={item.brand}
              price={item.priceRange}
              priority={index < 2}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
