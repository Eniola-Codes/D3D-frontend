import { expect, Page, test } from '@playwright/test';
import { routes } from '@/lib/constants/page-routes';

export const productsPath = `${routes.dashboard.path.base}${routes.dashboard.path.myProducts}`;

export async function gotoMyProducts(page: Page) {
  await page.goto(routes.dashboard.path.base);

  await page.locator('span[data-slot="breadcrumb-page"]').waitFor();
  await expect(page.locator('span[data-slot="breadcrumb-page"]')).toHaveText('Dashboard');

  await page.getByRole('link', { name: /My Products/i }).click();

  await page.locator('span[data-slot="breadcrumb-page"]').waitFor();
  await expect(page.locator('span[data-slot="breadcrumb-page"]')).toHaveText(/My Products/i);
}

export async function gotoMyProductsWithParams(page: Page, params: Record<string, string>) {
  const search = new URLSearchParams(params).toString();
  await page.goto(`${productsPath}?${search}`);
  await page.locator('span[data-slot="breadcrumb-page"]').waitFor();
  await expect(page.locator('span[data-slot="breadcrumb-page"]')).toHaveText(/My Products/i);
}

export async function skipIfNoPagination(page: Page) {
  const pageTwo = page.getByRole('link', { name: '2', exact: true });
  const hasPagination = await pageTwo.isVisible().catch(() => false);
  test.skip(!hasPagination, 'Skipped because pagination is not available');
}

export async function skipIfNoProducts(page: Page) {
  const firstCard = page.locator('#product-list > div').first();
  const hasProducts = await firstCard.isVisible().catch(() => false);
  test.skip(!hasProducts, 'Skipped because product catalog is empty');
}

export async function gotoProduct(page: Page, slug: string, params?: Record<string, string>) {
  const search = params ? `?${new URLSearchParams(params).toString()}` : '';
  await page.goto(`${productsPath}/${slug}${search}`);
  await page.waitForLoadState('domcontentloaded');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible({ timeout: 20_000 });
}
