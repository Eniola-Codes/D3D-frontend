import { endpoints } from '@/lib/constants/endpoints';

export function useConnectPlatform() {
  const handleConnect = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoints.shopify.base}${endpoints.shopify.init}`;
    window.location.href = url;
  };

  return {
    handleConnect,
  };
}
