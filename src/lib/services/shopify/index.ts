import { apiClientService } from '@/lib/services/api/client';
import { endpoints } from '@/lib/constants/endpoints';
import { ShopifyInitResponse } from '../../../../interfaces/auth';

export const shopifyService = {
  async init(shop: string) {
    return apiClientService.get<ShopifyInitResponse>(
      `${endpoints.shopify.base}${endpoints.shopify.init}?shop=${encodeURIComponent(shop)}`
    );
  },
};
