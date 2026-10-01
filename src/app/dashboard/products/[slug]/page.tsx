import { notFound, redirect } from 'next/navigation';
import DashboardLayout from '@/components/dashboard/layout/components';
import { ProductPageProps, ProductResponse } from '@/interfaces/product';
import { VariantResponse } from '@/interfaces/variants';
import { productServerService } from '@/lib/services/product/server';
import ProductVariantSection from '@/components/dashboard/products/components/product-details/product-variants/product-variant-section';
import ProductTabs from '@/components/dashboard/products/components/product-details/product-info/product-tabs';
import RelatedProducts from '@/components/dashboard/products/components/product-details/product-info/related-products';
import { routes } from '@/lib/constants/page-routes';
import { initialSelections, selectionsToQuery } from '@/lib/utils/dashboard/product';

export default async function ProductPage({ params, searchParams }: ProductPageProps) {
  const { slug } = await params;
  const urlParams = await searchParams;
  const urlQuery = new URLSearchParams(urlParams as Record<string, string>).toString();
  const productPath = `${routes.dashboard.path.base}${routes.dashboard.path.myProducts}/${slug}`;

  let productResponse: ProductResponse;
  let variantResponse: VariantResponse;

  try {
    productResponse = await productServerService.getProduct(slug);
  } catch (err: unknown) {
    if ((err as { status?: number }).status === 500) {
      redirect(routes.error);
    }

    return notFound();
  }

  const defaultSelection = initialSelections(productResponse.product.options);
  const defaultQuery = selectionsToQuery(defaultSelection);
  let selection = defaultSelection;
  const query = urlQuery || defaultQuery;

  try {
    variantResponse = await productServerService.getVariant(slug, query);

    if (variantResponse.variant?.options?.length) {
      selection = Object.fromEntries(
        variantResponse.variant.options.map(option => [option.title, option.value])
      );
    }
  } catch (err: unknown) {
    if ((err as { status?: number }).status === 500) {
      redirect(routes.error);
    }

    redirect(productPath);
  }

  return (
    <DashboardLayout>
      <div className="p-3 lg:p-5">
        <ProductVariantSection
          selection={selection}
          product={productResponse.product}
          variant={variantResponse.variant}
        />
        <ProductTabs product={productResponse.product} />
        <RelatedProducts products={productResponse.relatedProducts} />
      </div>
    </DashboardLayout>
  );
}
