import { apiServerService } from '@/lib/services/api/server';
import { endpoints } from '@/lib/constants/endpoints';
import type { ProductListResponse, ProductResponse, VariantResponse } from '@/interfaces/product';

export const productServerService = {
  async getProducts(params?: URLSearchParams) {
    const query = params?.toString();
    const url = `${endpoints.products.base}${endpoints.products.getProducts}${query ? `?${query}` : ''}`;
    return apiServerService.get<ProductListResponse>(url);
  },

  async getProduct(slug: string) {
    return apiServerService.get<ProductResponse>(`${endpoints.products.base}/${slug}`);
  },

  async getVariant(slug: string, query: string) {
    return apiServerService.get<VariantResponse>(
      `${endpoints.variants.base}/${slug}${query ? `?${query}` : ''}`
    );
  },
};
