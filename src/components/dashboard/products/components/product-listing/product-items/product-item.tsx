import clsx from 'clsx';
import { ProductItemActions } from '../product-actions/product-item-actions';
import { ProductBrandBadge } from '../product-actions/product-brand-badge';
import { IBrand, IPriceRange, ProductOptionCombo } from '@/interfaces/product';
import { ProductItemCopy } from '../product-actions/product-item-copy';
import Image from 'next/image';
import Link from 'next/link';
import { shimmer, toBase64 } from '@/lib/utils/shared/image-shimmer';
import { routes } from '@/lib/constants/page-routes';

export function ProductItem({
  handle,
  title,
  src,
  brand,
  price,
  priority,
  description,
  options,
}: {
  handle: string;
  title: string;
  src: string;
  brand: IBrand;
  price: IPriceRange;
  priority: boolean;
  description: string;
  options: ProductOptionCombo[];
}) {
  return (
    <div
      className={clsx(
        'group flex h-full w-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow group-hover:shadow-md hover:shadow-md dark:bg-black'
      )}
    >
      <div className="relative h-50 w-full shrink-0 overflow-hidden bg-white">
        <Link
          href={`${routes.dashboard.path.base}${routes.dashboard.path.myProducts}/${handle}`}
          aria-label={title}
          className="relative z-1 block h-full w-full"
        >
          <Image
            className="m-auto h-full w-full object-cover"
            src={src}
            alt={title}
            width={500}
            height={500}
            placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
            priority={priority}
          />
        </Link>
        <ProductItemActions />
      </div>
      <div className="w-full border-t bg-white p-4 text-sm text-black" id="product-details">
        <div className="flex items-center justify-between gap-2">
          <h3 className="flex min-w-0 flex-1 items-center gap-2 leading-5 font-medium text-neutral-900">
            <Link href={brand.website} className="relative z-1 shrink-0 transition hover:scale-105">
              <ProductBrandBadge brandLogo={brand.logo} brandName={brand.title} />
            </Link>
            <span className="flex-1 truncate">{title}</span>
          </h3>
          <ProductItemCopy title={title} />
        </div>
        <p className="text-muted-foreground mt-3 text-sm">
          {description}{' '}
          {options?.length ? (
            <span className="text-black">
              ● <span className="text-muted-foreground">{options.length} Variants</span>
            </span>
          ) : (
            ''
          )}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-base font-semibold">From ${price?.minVariantPrice}</p>
        </div>
      </div>
    </div>
  );
}
