'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/shared/class-merge';
import { shimmer, toBase64 } from '@/lib/utils/shared/image-shimmer';
import type { ProductImageSliderProps } from '@/interfaces/product';
import { useProductVariantImages } from '@/components/dashboard/products/hooks/use-product-variant-images';

export default function ProductVariantImages({
  images,
  title,
  featuredImage,
}: ProductImageSliderProps) {
  const {
    displayImages,
    selectedImage,
    setSelectedImage,
    scrollRef,
    canScrollLeft,
    canScrollRight,
    updateScrollButtons,
    scroll,
    goToImage,
  } = useProductVariantImages(images, featuredImage);

  return (
    <div>
      <div className="group bg-muted relative aspect-square overflow-hidden rounded-md">
        <Image
          src={selectedImage}
          alt={title}
          className="h-full w-full object-cover"
          width={500}
          height={500}
          placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
          priority
        />

        {displayImages.length > 1 ? (
          <>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Previous image"
              onClick={() => goToImage('prev')}
              className="bg-background/90 absolute top-1/2 left-3 z-10 h-9 w-9 -translate-y-1/2 rounded-full opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Next image"
              onClick={() => goToImage('next')}
              className="bg-background/90 absolute top-1/2 right-3 z-10 h-9 w-9 -translate-y-1/2 rounded-full opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        ) : null}
      </div>

      {displayImages.length > 1 ? (
        <div className="relative mt-3">
          {canScrollLeft ? (
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Previous images"
              onClick={() => scroll('left')}
              className="bg-background/90 absolute top-1/2 left-0 z-10 h-8 w-8 -translate-y-1/2 rounded-full shadow-sm"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          ) : null}

          <div
            ref={scrollRef}
            onScroll={updateScrollButtons}
            className="flex gap-2 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {displayImages.map((img, i) => {
              const isSelected = img === selectedImage;

              return (
                <button
                  key={`${img}-${i}`}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  aria-label={`View ${title} image ${i + 1}`}
                  aria-pressed={isSelected}
                  className={cn(
                    'bg-muted aspect-square w-24 shrink-0 cursor-pointer overflow-hidden rounded-sm transition-all duration-300 sm:w-28',
                    isSelected ? 'scale-100 border-2 border-black' : 'hover:scale-95'
                  )}
                >
                  <Image
                    src={img}
                    alt={`${title} image ${i + 1}`}
                    width={150}
                    height={150}
                    placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              );
            })}
          </div>

          {canScrollRight ? (
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Next images"
              onClick={() => scroll('right')}
              className="bg-background/90 absolute top-1/2 right-0 z-10 h-8 w-8 -translate-y-1/2 rounded-full shadow-sm"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
