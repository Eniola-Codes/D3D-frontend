'use client';

import Image from 'next/image';
import { getBrandInitials } from '@/lib/utils/dashboard/brand';
import { useRouter } from 'next/navigation';

export function ProductBrandBadge({
  brandLogo,
  brandName,
}: {
  brandLogo?: string;
  brandName: string;
}) {
  const initials = getBrandInitials(brandName);
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        router.push(`/dashboard?brand=${encodeURIComponent(brandName)}`);
      }}
      aria-label={`Open brand ${brandName}`}
      className="inline-flex h-5 min-w-5 items-center justify-center rounded bg-neutral-100 px-1 text-[10px] font-semibold text-neutral-700"
    >
      {brandLogo ? (
        <Image
          src={brandLogo}
          alt={brandName}
          width={16}
          height={16}
          className="h-4 w-4 object-contain"
        />
      ) : (
        initials
      )}
    </button>
  );
}
