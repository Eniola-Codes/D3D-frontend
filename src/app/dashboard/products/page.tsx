import { ProductFilter } from '@/components/dashboard/products/components/product-listing/product-filters/product-filters';
import { ProductContent } from '@/components/dashboard/products/components/product-listing/product-items/product-content';
import DashboardLayout from '@/components/dashboard/layout/components';
import { ProductListResponse } from '@/interfaces/product';
import { FAILED_TO_FETCH_PRODUCTS } from '@/lib/constants/messages';
import { routes } from '@/lib/constants/page-routes';
import { productServerService } from '@/lib/services/product/server';
import { buildProductSearchParams } from '@/lib/utils/dashboard/product';
import { redirect } from 'next/navigation';

export default async function SearchPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const { search, sort, category, brand, price } = searchParams as { [key: string]: string };
  const params = buildProductSearchParams(searchParams);
  let response: ProductListResponse;

  try {
    response = await productServerService.getProducts(params);
  } catch (err: unknown) {
    if ((err as { status?: number }).status === 500) {
      redirect(routes.error);
    }
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
      message: FAILED_TO_FETCH_PRODUCTS,
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
