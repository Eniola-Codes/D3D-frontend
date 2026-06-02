import { ProductFilter } from '@/components/dashboard/find-products/components/product-filters/product-filters';
import { ProductContent } from '@/components/dashboard/find-products/components/product-items/product-content';
import DashboardLayout from '@/components/dashboard/layout/components';
import { ProductListResponse } from '@/interfaces/product';
import { endpoints } from '@/lib/constants/endpoints';
import { apiServerService } from '@/lib/services/api/server';
import { buildProductSearchParams } from '@/lib/utils/dashboard/product';

export default async function SearchPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const { search, sort, category, brand, price } = searchParams as { [key: string]: string };
  const params = buildProductSearchParams(searchParams);
  let response: ProductListResponse;

  try {
    response = await apiServerService.get<ProductListResponse>(
      `${endpoints.products.base}${endpoints.products.getProducts}?${params.toString()}`
    );
  } catch {
    response = {
      products: [],
      pagination: {
        currentPage: 1,
        nextPage: 1,
        prevPage: 1,
        totalCount: 0,
        totalPages: 1,
      },
      filter: { brands: [], categories: [] },
      message: 'Failed to fetch products',
    };
  }
    
  return (
    <DashboardLayout>
      <ProductFilter
        search={search}
        category={category}
        brand={brand}
        price={price}
        sort={sort}
        filterOptions={response.filter}
      />
      <ProductContent params={params} response={response} />
    </DashboardLayout>
  );
}
