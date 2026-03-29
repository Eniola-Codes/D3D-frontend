'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils/class-merge';
import { routes } from '@/lib/constants/page-routes';
import { Card } from '../ui/card';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button';
import Image from 'next/image';
import { shopify_logo } from '../../../public/assets/logo';
import { useConnectPlatform } from './hooks/connect-platform';

export function ConnectPlatform({ className }: React.ComponentPropsWithoutRef<'form'>) {
  const router = useRouter();
  const { isLoading, handleConnect } = useConnectPlatform();
  const [showStoreInput, setShowStoreInput] = useState(false);
  const [storeName, setStoreName] = useState('');

  const handleSend = async () => {
    const trimmedStoreName = storeName.trim();
    if (!trimmedStoreName) return;
    await handleConnect(trimmedStoreName);
  };

  return (
    <div className={cn('flex flex-col items-center gap-6 md:items-start', className)}>
      <Card
        className="mt-6 w-full cursor-pointer py-8 hover:bg-gray-100 sm:w-72"
        onClick={() => setShowStoreInput(true)}
      >
        <Image src={shopify_logo} alt="shopify" width={150} className="mx-auto" />
        {showStoreInput && (
          <div
            className="mt-4 flex items-center gap-2 px-4"
            onClick={e => {
              e.stopPropagation();
            }}
          >
            <Input
              type="text"
              placeholder="Enter store name"
              value={storeName}
              onChange={e => setStoreName(e.target.value)}
              className="h-10"
            />
            <Button
              type="button"
              size="sm"
              onClick={handleSend}
              disabled={isLoading || !storeName.trim()}
            >
              Send
            </Button>
          </div>
        )}
      </Card>
      <div className="text-center text-sm">
        Don&apos;t have a store account yet?{' '}
        <button
          type="button"
          onClick={() => router.push(`?${routes.dashboard.path}`)}
          className="cursor-pointer underline underline-offset-4"
        >
          Skip
        </button>
      </div>
    </div>
  );
}
