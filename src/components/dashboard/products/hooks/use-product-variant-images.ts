import { useCallback, useEffect, useRef, useState } from 'react';

export function useProductVariantImages(images: string[], featuredImage: string) {
  const displayImages = images.length > 0 ? images : [featuredImage];
  const [selectedImage, setSelectedImage] = useState(displayImages[0]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    setSelectedImage(images[0] ?? featuredImage);
  }, [featuredImage, images]);

  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    updateScrollButtons();
    window.addEventListener('resize', updateScrollButtons);
    return () => window.removeEventListener('resize', updateScrollButtons);
  }, [images, updateScrollButtons]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollAmount = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const selectedIndex = Math.max(0, displayImages.indexOf(selectedImage));

  const goToImage = (direction: 'prev' | 'next') => {
    if (displayImages.length <= 1) return;

    const nextIndex =
      direction === 'prev'
        ? (selectedIndex - 1 + displayImages.length) % displayImages.length
        : (selectedIndex + 1) % displayImages.length;

    setSelectedImage(displayImages[nextIndex]);
  };

  return {
    displayImages,
    selectedImage,
    setSelectedImage,
    scrollRef,
    canScrollLeft,
    canScrollRight,
    updateScrollButtons,
    scroll,
    goToImage,
  };
}
