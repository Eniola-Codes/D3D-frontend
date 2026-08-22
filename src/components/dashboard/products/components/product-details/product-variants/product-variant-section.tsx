'use client';

import { Hash, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils/shared/class-merge';
import type { ProductVariantSectionProps } from '@/interfaces/variants';
import ProductImageSlider from '@/components/dashboard/products/components/product-details/product-variants/product-variant-images';
import ProductVariantOptions from '@/components/dashboard/products/components/product-details/product-variants/product-variant-options';
import ImportProductButton from '@/components/dashboard/products/components/product-details/product-actions/import-product-button';
import { ProductBrandBadge } from '../../product-listing/product-actions/product-brand-badge';
import Link from 'next/link';

export default function ProductVariantSection({
  product,
  selection,
  variant,
}: ProductVariantSectionProps) {
  const { title, shortDescription, featuredImage, options = [], brand } = product;
  const { price, inStock, sku, url, images = [] } = variant;
  const { website, logo, title: brandTitle } = brand;

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:gap-6 xl:gap-8">
      <div className="top-0 min-w-0 lg:sticky lg:w-1/2">
        <ProductImageSlider images={images} title={title} featuredImage={featuredImage} />
      </div>
      <div className="lg:w-1/2 xl:mt-2">
        <div className="lg:sticky lg:top-5">
          <h1 className="text-3xl font-bold">{title}</h1>

          <div className="mt-2 flex items-center gap-2">
            <Link
              href={website}
              className="flex min-w-0 items-center gap-2 font-medium text-neutral-900"
            >
              <ProductBrandBadge brandLogo={logo} brandName={brandTitle} />
              <span className="flex-1 truncate text-sm underline underline-offset-4">
                {brand.title}
              </span>
            </Link>

            <span>●</span>

            <div className="flex items-center">
              <a
                className="flex items-center gap-1 underline underline-offset-4"
                href={url}
                target="_blank"
                rel="noreferrer"
              >
                <p className="text-sm">View original product</p>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          {price && (
            <div className="mt-4">
              <span className="text-primary text-3xl font-bold">${price.toFixed(2)}</span>
            </div>
          )}

          {shortDescription && (
            <div className="mt-4">
              <p className="text-muted-foreground">{shortDescription}</p>
            </div>
          )}

          {selection && options.length > 0 && (
            <div className="mt-4">
              <ProductVariantOptions options={options} selection={selection} />
            </div>
          )}

          <div className="mt-4 space-y-2.5">
            <div className="flex items-center space-x-1.5">
              <span className="relative flex size-3">
                <span
                  className={cn(
                    'absolute inline-flex h-full w-full animate-ping rounded-full opacity-50',
                    inStock ? 'bg-green-500' : 'bg-red-500'
                  )}
                />
                <span
                  className={cn(
                    'relative m-auto inline-flex size-2 rounded-full',
                    inStock ? 'bg-green-500' : 'bg-red-500'
                  )}
                />
              </span>
              <span className="text-sm">{inStock ? 'In stock' : 'Out of stock'}</span>
            </div>
            <div className="text-muted-foreground flex items-center space-x-1.5 text-sm">
              <Hash className="h-4 w-4" />
              <span>{sku || 'N/A'}</span>
            </div>
          </div>

          <div className="mt-4 space-y-4">
            <ImportProductButton product={product} className="w-full" />
          </div>

          {/* <div className="grid grid-cols-1 gap-4 border-t border-b py-4 sm:grid-cols-3">
            <div className="flex items-center">
              <Truck className="text-primary mr-2 h-5 w-5" />
              <div>
                <p className="text-sm font-medium">Free Delivery</p>
                <p className="text-muted-foreground text-xs">For orders over $35</p>
              </div>
            </div>
            <div className="flex items-center">
              <RotateCcw className="text-primary mr-2 h-5 w-5" />
              <div>
                <p className="text-sm font-medium">30-Day Returns</p>
                <p className="text-muted-foreground text-xs">No questions asked</p>
              </div>
            </div>
            <div className="flex items-center">
              <ShieldCheck className="text-primary mr-2 h-5 w-5" />
              <div>
                <p className="text-sm font-medium">Secure Checkout</p>
                <p className="text-muted-foreground text-xs">Protected payments</p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
