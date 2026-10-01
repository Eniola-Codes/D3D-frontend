import Image from 'next/image';
import { getBrandInitials } from '@/lib/utils/dashboard/brand';

export function ProductBrandBadge({
  brandLogo,
  brandName,
}: {
  brandLogo?: string;
  brandName: string;
}) {
  const initials = getBrandInitials(brandName);

  return (
    <>
      {brandLogo ? (
        <Image
          src={brandLogo}
          alt=""
          width={20}
          height={20}
          className="shrink-0 transition hover:scale-110"
        />
      ) : (
        <span className="inline-block shrink-0 rounded-full bg-gray-200 px-1.5 py-px text-sm font-semibold text-neutral-700 transition hover:scale-105">
          {initials}
        </span>
      )}
    </>
  );
}
