import clsx from 'clsx';
import Image from 'next/image';
import { ProductItemActions } from './product-item-actions';
import { ProductBrandBadge } from './product-brand-badge';
import { getProductCardMeta } from '@/lib/utils/dashboard/product';
import { defaultProductImage } from '../../../../../../public/assets/default-images';

export function ProductItem({
  title,
  src,
  amount,
  currencyCode,
  discount = '-66%',
  shippingCost = '$ 1.99',
  rating = 4.7,
  brandLogo,
  brandName = 'Brand',
}: {
  title: string;
  src: string;
  amount: {
    maxVariantPrice: number;
    minVariantPrice: number;
  };
  currencyCode: string;
  discount?: string;
  shippingCost?: string;
  rating?: number;
  brandLogo?: string;
  brandName?: string;
}) {
  const { ratingText, showDiscount } = getProductCardMeta({
    discount,
    rating,
  });

  return (
    <div
      className={clsx(
        'group flex h-full w-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-md dark:bg-black'
      )}
    >
      <div className="relative h-50 w-full shrink-0 overflow-hidden bg-white">
        <ProductItemActions />
        <Image
          className="m-auto h-full w-full object-cover"
          src={src || defaultProductImage}
          alt={title}
          width={400}
          height={400}
        />
      </div>
      <div className="w-full border-t bg-white p-4 text-sm text-black">
        <h3 className="line-clamp-2 flex items-center gap-2 leading-5 font-medium text-neutral-900">
          <ProductBrandBadge brandLogo={brandLogo} brandName={brandName} />
          <span>{title}</span>
        </h3>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-base font-semibold">
            {currencyCode} {amount.minVariantPrice} - {amount.maxVariantPrice}
          </p>
          {showDiscount ? (
            <p className="rounded bg-red-100 px-2 py-0.5 text-xs text-red-600">{discount}</p>
          ) : null}
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-neutral-600">
          <p>Shipping cost</p>
          <p>{shippingCost}</p>
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-neutral-600">
          <p>Rating</p>
          <p className="font-medium text-amber-500">{ratingText}</p>
        </div>
      </div>
    </div>
  );
}
