import clsx from 'clsx';
import { ProductItemActions } from '../product-actions/product-item-actions';
import { ProductBrandBadge } from '../product-actions/product-brand-badge';
import { getRating } from '@/lib/utils/dashboard/product';
import { IBrand, IPriceRange } from '@/interfaces/product';
import { ProductItemCopy } from '../product-actions/product-item-copy';
import Image from 'next/image';
import Link from 'next/link';
import { shimmer, toBase64 } from '@/lib/utils/shared/image-shimmer';
import { routes } from '@/lib/constants/page-routes';

export function ProductItem({
  handle,
  title,
  src,
  rating,
  brand,
  price,
  priority,
}: {
  handle: string;
  title: string;
  src: string;
  rating: number;
  brand: IBrand;
  price: IPriceRange;
  priority: boolean;
}) {
  const { ratingText } = getRating({
    rating,
  });

  return (
    <div
      className={clsx(
        'group flex h-full w-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-md dark:bg-black'
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
            <ProductBrandBadge brandLogo={brand.logo} brandName={brand.title} />
            <span className="flex-1 truncate">{title}</span>
          </h3>
          <ProductItemCopy title={title} />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-base font-semibold">From ${price?.minVariantPrice}</p>
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-neutral-600">
          <p>Rating</p>
          <p className="font-medium text-amber-500">{ratingText}</p>
        </div>
      </div>
    </div>
  );
}
