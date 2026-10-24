import { test, expect } from '@playwright/test';
import {
  gotoMyProducts,
  gotoProduct,
  productsPath,
  skipIfNoProducts,
} from '../helpers/products/product-list';
import {
  firstAvailableVariantOption,
  gotoFirstProductDetail,
  skipIfNoVariantOptions,
  skipIfNoImageCarousel,
  skipIfNoSimilarProducts,
  dummyGetRealProduct,
} from '../helpers/products/product-details';

test.describe('Product Details', () => {
  test('should open product detail from product card', async ({ page }) => {
    await gotoFirstProductDetail(page);
    await expect(page).toHaveURL(new RegExp(`${productsPath}/.+`));
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    const importButton = page.getByRole('button', { name: /Import to Shopify/i });
    await expect(importButton).toBeVisible();
    await expect(importButton).toBeEnabled();
  });

  test('should load core product details', async ({ page }) => {
    await gotoFirstProductDetail(page);

    const title = page.getByRole('heading', { level: 1 });
    await expect(title).toBeVisible();
    await expect(title).not.toBeEmpty();
    await expect(page.getByText(/^\$\d/)).toBeVisible();
    await expect(page.getByText(/In stock|Out of stock/)).toBeVisible();
    await expect(page.getByTestId('product-sku')).not.toBeEmpty();
  });

  test('should show breadcrumbs for product detail', async ({ page }) => {
    await gotoFirstProductDetail(page);
    const href = new URL(page.url()).pathname;
    const slug = href.split('/').pop()!;

    const breadcrumb = page.getByLabel('breadcrumb');
    await expect(breadcrumb.getByRole('link', { name: 'Dashboard' })).toBeVisible();
    await expect(breadcrumb.getByRole('link', { name: /My Products/i })).toBeVisible();
    await expect(page.locator('span[data-slot="breadcrumb-page"]')).toContainText(
      slug.charAt(0).toUpperCase() + slug.slice(1)
    );
  });

  test('should update URL when selecting a variant option', async ({ page }) => {
    await gotoFirstProductDetail(page);
    await skipIfNoVariantOptions(page);

    const option = await firstAvailableVariantOption(page);
    const optionName =
      (await option.getAttribute('aria-label')) || (await option.innerText()).trim();
    expect(optionName).not.toBe('');

    await option.click();
    await expect(page).toHaveURL(new RegExp(`${productsPath}/.+\\?.+=.+`));
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByText(/^\$\d/)).toBeVisible();
  });

  test('should load product detail from deep-link variant URL params', async ({ page }) => {
    await gotoFirstProductDetail(page);
    await skipIfNoVariantOptions(page);

    const option = await firstAvailableVariantOption(page);
    await option.click();
    await expect(page).toHaveURL(/\?.+=.+/);

    const deepLink = page.url();
    await page.goto(productsPath);
    await page.goto(deepLink);

    await expect(page).toHaveURL(deepLink);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByText(/^\$\d/)).toBeVisible();
  });

  test('should show not found for invalid product slug', async ({ page }) => {
    const response = await page.goto(`${productsPath}/zzzz-invalid-product-slug-xyz`);
    expect(response?.status()).toBe(404);
    await expect(page.getByText('This page could not be found.')).toBeVisible();
  });

  test('should navigate images with carousel controls', async ({ page }) => {
    await gotoFirstProductDetail(page);

    const mainImage = page.getByTestId('main-image');
    await expect(mainImage).toBeVisible();

    await skipIfNoImageCarousel(page);

    const beforeSrc = await mainImage.getAttribute('src');
    await page.getByRole('button', { name: 'Next image' }).first().click({ force: true });
    await expect(mainImage).not.toHaveAttribute('src', beforeSrc!);
    await page.getByRole('button', { name: 'Previous image' }).first().click({ force: true });
    await expect(mainImage).toHaveAttribute('src', beforeSrc!);
  });

  test('should select image from thumbnail strip', async ({ page }) => {
    await gotoFirstProductDetail(page);
    await skipIfNoImageCarousel(page);

    const title = (await page.getByRole('heading', { level: 1 }).innerText()).trim();
    const secondThumb = page.getByRole('button', { name: `View ${title} image 2` });
    await expect(secondThumb).toBeVisible();
    await secondThumb.click();

    const thirdThumb = page.getByRole('button', { name: `View ${title} image 3` });
    await expect(thirdThumb).toBeVisible();
    await thirdThumb.click();

    await expect(page.getByRole('button', { name: `View ${title} image 1` })).toHaveAttribute(
      'aria-pressed',
      'false'
    );
  });

  test('should show similar products and open a related product', async ({ page }) => {
    await gotoFirstProductDetail(page);
    await skipIfNoSimilarProducts(page);

    const relatedProduct = page.locator(`[href^="${productsPath}/"]`).first();
    const href = await relatedProduct.getAttribute('href');
    expect(href).toMatch(new RegExp(`^${productsPath}/.+`));
    expect(relatedProduct).toBeVisible();

    // await relatedProduct.click();
    // await expect(page).toHaveURL(href!);
    // await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('should keep unavailable variant options disabled', async ({ page }) => {
    await gotoFirstProductDetail(page);
    await skipIfNoVariantOptions(page);

    const unavailable = page.locator('[role="radio"][disabled][aria-checked="false"]').first();
    const hasUnavailable = (await unavailable.count()) > 0;
    test.skip(!hasUnavailable, 'Skipped because no unavailable variant options');

    await expect(unavailable).toBeDisabled();
  });

  test('should navigate back to My Products via breadcrumb', async ({ page }) => {
    await gotoFirstProductDetail(page);

    await page
      .getByLabel('breadcrumb')
      .getByRole('link', { name: /My Products/i })
      .click();
    await expect(page).toHaveURL(productsPath);
    await expect(page.locator('span[data-slot="breadcrumb-page"]')).toHaveText(/My Products/i);
  });

  test('should redirect invalid variant query back to product slug', async ({ page }) => {
    await gotoMyProducts(page);
    await skipIfNoProducts(page);
    await dummyGetRealProduct(page);

    const firstCard = page.locator('#product-list').locator('div').first();
    await firstCard.waitFor();
    const href = await firstCard.locator(`[href^="${productsPath}/"]`).first().getAttribute('href');
    const slug = href!.split('/').pop()!;

    await page.goto(`${productsPath}/${slug}?color=zzzz-invalid-variant-xyz`);
    await expect(page).toHaveURL(new RegExp(`${productsPath}/${slug}$`));
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('should hide carousel controls when only one image exists', async ({ page }) => {
    await gotoFirstProductDetail(page);

    const nextImage = page.getByRole('button', { name: 'Next image' });
    const hasCarousel = (await nextImage.count()) > 0;
    test.skip(hasCarousel, 'Skipped because product has multiple images');

    await expect(page.getByRole('button', { name: 'Next image' })).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Previous image' })).toHaveCount(0);
  });

  test('should show short description when available', async ({ page }) => {
    await gotoFirstProductDetail(page);

    const shortDescription = page.locator('.lg\\:w-1\\/2 p.text-muted-foreground').first();
    const hasDescription = await shortDescription.isVisible().catch(() => false);
    test.skip(!hasDescription, 'Skipped because product has no short description');

    await expect(shortDescription).not.toBeEmpty();
  });

  test.only('should keep selected variant radio checked after selection', async ({ page }) => {
    await gotoFirstProductDetail(page);
    await skipIfNoVariantOptions(page);

    const option = await firstAvailableVariantOption(page);
    const optionName =
      (await option.getAttribute('aria-label')) || (await option.innerText()).trim();
    await option.click();
    const selectedOption = page.getByRole('radio', { name: optionName, exact: true });
    await expect(selectedOption).toHaveAttribute('aria-checked', 'true');
  });
});
