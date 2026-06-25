import Link from 'next/link';
import Image from 'next/image';
import { routes } from '@/lib/constants/page-routes';
import { getBrandInitials } from '@/lib/utils/dashboard/brand';

const productsPath = `${routes.dashboard.path.base}${routes.dashboard.path.findProducts}`;

export function ProductBrandBadge({
  brandLogo,
  brandName,
}: {
  brandLogo?: string;
  brandName: string;
}) {
  const initials = getBrandInitials(brandName);
  const href = `${productsPath}?brand=${encodeURIComponent(brandName)}`;

  return (
    <Link
      href={href}
      aria-label={`Filter by ${brandName}`}
      className="relative z-1 shrink-0 transition hover:scale-110"
    >
      {brandLogo ? (
        <Image src={brandLogo} alt="" width={20} height={20} />
      ) : (
        <span className="inline-block rounded-full bg-gray-200 px-1.5 py-[1px] text-sm font-semibold text-neutral-700">
          {initials}
        </span>
      )}
    </Link>
  );
}
