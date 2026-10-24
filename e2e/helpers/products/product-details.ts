import { Page, test } from '@playwright/test';
import { routes } from '@/lib/constants/page-routes';
import { gotoMyProducts } from './product-list';

export const productsPath = `${routes.dashboard.path.base}${routes.dashboard.path.myProducts}`;

export async function skipIfNoProducts(page: Page) {
  const firstCard = page.locator('#product-list > div').first();
  const hasProducts = await firstCard.isVisible().catch(() => false);
  test.skip(!hasProducts, 'Skipped because product catalog is empty');
}

export async function dummyGetRealProduct(page: Page) {
  await page.getByRole('button', { name: /Sort:/ }).click();
  const sortOption = page.getByRole('menuitem').nth(4);
  await sortOption.click();
  await page.waitForURL(/[?&]sort=/);
}

export async function gotoFirstProductDetail(page: Page) {
  await gotoMyProducts(page);
  await skipIfNoProducts(page);
  await dummyGetRealProduct(page);

  const firstCard = page.locator('#product-list').locator('div').first();
  await firstCard.waitFor();
  await firstCard.click();
  await page.waitForURL(new RegExp(`${productsPath}/.+`));
}

export async function skipIfNoVariantOptions(page: Page) {
  const radiogroup = page.getByRole('radiogroup').first();
  const hasOptions = await radiogroup.isVisible().catch(() => false);
  test.skip(!hasOptions, 'Skipped because product has no variant options');
}

export async function firstAvailableVariantOption(page: Page) {
  const radiogroup = page.getByRole('radiogroup').first();
  const option = radiogroup.locator('[role="radio"]:not([disabled])').first();
  const hasAvailable = await option.isVisible().catch(() => false);
  test.skip(!hasAvailable, 'Skipped because no alternate available variant option');
  return option;
}

export async function skipIfNoImageCarousel(page: Page) {
  const nextImage = page.getByRole('button', { name: 'Next image' });
  const hasCarousel = (await nextImage.count()) > 0;
  test.skip(!hasCarousel, 'Skipped because product has fewer than 2 images');
}

export async function skipIfNoSimilarProducts(page: Page) {
  const similarHeading = page.getByRole('heading', { name: 'Similar Products' });
  const similarCard = page.locator(`[href^="${productsPath}/"]`).first();
  const hasSimilarHeading = await similarHeading.isVisible().catch(() => false);
  const hasSimilar = await similarCard.isVisible().catch(() => false);
  test.skip(!hasSimilar, 'Skipped because no similar products are available');
  test.skip(!hasSimilarHeading, 'Skipped because no similar products are available');
}
