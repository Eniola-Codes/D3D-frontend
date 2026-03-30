import { endpoints } from '@/lib/constants/endpoints';

export function useConnectStore() {
  const handleConnect = async (shop: string) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoints.shopify.base}${endpoints.shopify.init}?shop=${shop}`;
    window.location.href = url;
  };

  return {
    handleConnect,
  };
}
