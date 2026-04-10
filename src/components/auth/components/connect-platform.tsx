'use client';

import { cn } from '@/lib/utils/class-merge';
import { routes } from '@/lib/constants/page-routes';
import { Card } from '../../ui/card';
import Image from 'next/image';
import { shopify_logo } from '../../../../public/assets/logo';
import { useConnectPlatform } from '../hooks/connect-platform';
import Link from 'next/link';

export function ConnectPlatform({ className }: React.ComponentPropsWithoutRef<'form'>) {
  const { handleConnect } = useConnectPlatform();

  return (
    <div className={cn('flex flex-col items-center gap-6 md:items-start', className)}>
      <button type="button" onClick={handleConnect}>
        <Card className="mt-6 w-full cursor-pointer py-8 hover:bg-gray-100 sm:w-72">
          <Image src={shopify_logo} alt="shopify" width={150} className="mx-auto" />
        </Card>
      </button>
      <div className="text-center text-sm">
        Don&apos;t have a store account yet?{' '}
        <Link
          href={routes.dashboard.path.base}
          className="cursor-pointer underline underline-offset-4"
        >
          Skip
        </Link>
      </div>
    </div>
  );
}
