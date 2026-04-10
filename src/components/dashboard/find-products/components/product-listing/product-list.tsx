import { ProductItem } from './product-item';
import { Product } from '../../../../../interfaces/product';
import Link from 'next/link';

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <>
      {products.map(product => (
        <div key={product.handle} className="animate-fadeIn transition-opacity">
          <Link
            className="relative inline-block w-full"
            href={`/product/${product.handle}`}
            prefetch={true}
          >
            <ProductItem
              title={product.title}
              currencyCode={product.currencyCode}
              amount={{
                maxVariantPrice: product.priceRange.maxVariantPrice,
                minVariantPrice: product.priceRange.minVariantPrice,
              }}
              src={product.featuredImage?.url}
              discount={product.discount}
              shippingCost={product.shippingCost}
              rating={product.rating}
              brandLogo={product.brandLogo}
              brandName={product.brandName}
            />
          </Link>
        </div>
      ))}
    </>
  );
}
