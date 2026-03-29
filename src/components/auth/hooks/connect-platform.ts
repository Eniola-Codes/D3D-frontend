import { useState } from 'react';
import { submitShopifyInitData } from '@/lib/utils/auth/form-handlers';

export function useConnectPlatform() {
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async (shop: string) => {
    setIsLoading(true);
    const url = await submitShopifyInitData(shop);
    if (url) {
      window.location.href = url;
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    handleConnect,
  };
}
