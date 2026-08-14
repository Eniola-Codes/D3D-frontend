import { expect, Page } from '@playwright/test';
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
