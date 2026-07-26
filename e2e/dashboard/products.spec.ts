import { test, expect } from '@playwright/test';
import { gotoFindProducts, gotoFindProductsWithParams, productsPath } from '../helpers/products';

test.describe('Find Products', () => {
  test('should open Find Products page when authenticated', async ({ page }) => {
    await gotoFindProducts(page);

    await expect(page.getByPlaceholder('Enter keywords to search...')).toBeVisible();
    await expect(page.getByRole('button', { name: 'All Categories' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'All Brands' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'All Prices' })).toBeVisible();
    await expect(page.getByRole('button', { name: /Sort:/ })).toBeVisible();
  });

  test('should load product grid from API', async ({ page }) => {
    await gotoFindProducts(page);

    const firstCard = page.locator('#product-list').locator('div').first();

    await expect(firstCard).toBeVisible();
    await expect(firstCard.locator('h3 span').last()).toBeVisible();
    await expect(firstCard.locator('h3 span').last()).not.toBeEmpty();
    await expect(
      firstCard.locator('#product-details').locator('div').nth(1).locator('p')
    ).toBeVisible();
    await expect(
      firstCard.locator('#product-details').locator('div').nth(1).locator('p')
    ).not.toBeEmpty();
    await expect(
      firstCard.locator('#product-details').locator('div').nth(2).locator('p').last()
    ).toBeVisible();
    await expect(
      firstCard.locator('#product-details').locator('div').nth(2).locator('p').last()
    ).not.toBeEmpty();
  });

  test('should search and update URL', async ({ page }) => {
    await gotoFindProducts(page);

    const searchInput = page.getByPlaceholder('Enter keywords to search...');
    await searchInput.fill('Nike');

    await expect(page).toHaveURL(/search=Nike/);
    await expect(searchInput).toHaveValue('Nike');

    const firstCard = page.locator('#product-list').locator('div').first();
    const emptyState = page.getByText('No Products Found');
    await expect(firstCard.or(emptyState)).toBeVisible();
  });

  test('should paginate correctly', async ({ page }) => {
    await gotoFindProducts(page);

    const pageOne = page.locator('a:has-text("1")');
    const pageTwo = page.locator('a:has-text("2")');

    if (!(await pageTwo.isVisible().catch(() => false))) {
      test.skip();
      return;
    }

    await pageTwo.click();
    await expect(page).toHaveURL(/page=2/);
    await expect(page.locator('#product-list').locator('div').first()).toBeVisible();

    await pageOne.click();
    await expect(page).not.toHaveURL(/page=/);
    await expect(page.locator('#product-list').locator('div').first()).toBeVisible();

    await page.getByRole('link', { name: 'Go to next page' }).click();
    await expect(page).toHaveURL(/page=2/);
    await expect(page.locator('#product-list').locator('div').first()).toBeVisible();

    await page.getByRole('link', { name: 'Go to previous page' }).click();
    await expect(page).not.toHaveURL(/page=/);
    await expect(page.locator('#product-list').locator('div').first()).toBeVisible();
  });

  test('should filter by category and update URL', async ({ page }) => {
    await gotoFindProducts(page);

    await page.getByRole('button', { name: 'All Categories' }).click();
    const categoryOption = page.getByRole('menuitem').nth(1);
    const categoryName = (await categoryOption.innerText()).trim();
    await categoryOption.click();

    await expect(page).toHaveURL(new RegExp(`category=${categoryName.replace(/ /g, '\\+')}`));
    await expect(page).not.toHaveURL(/page=/);
    await expect(
      page.locator('#product-list').locator('div').first().or(page.getByText('No Products Found'))
    ).toBeVisible();
  });

  test('should filter by brand and update URL', async ({ page }) => {
    await gotoFindProducts(page);

    await page.getByRole('button', { name: 'All Brands' }).click();
    const brandOption = page.getByRole('menuitem').nth(1);
    const brandName = (await brandOption.locator('span').last().innerText()).trim();
    await brandOption.click();

    await expect(page).toHaveURL(new RegExp(`brand=${brandName.replace(/ /g, '\\+')}`));
    await expect(page).not.toHaveURL(/page=/);
    await expect(
      page.locator('#product-list').locator('div').first().or(page.getByText('No Products Found'))
    ).toBeVisible();
  });

  test('should filter by price and update URL', async ({ page }) => {
    await gotoFindProducts(page);

    await page.getByRole('button', { name: 'All Prices' }).click();
    const priceOption = page.getByRole('menuitem').nth(1);
    const priceName = (await priceOption.innerText()).trim();
    await priceOption.click();

    await expect(page).toHaveURL(
      new RegExp(`price=${encodeURIComponent(priceName).replace(/%20/g, '\\+')}`)
    );
    await expect(page).not.toHaveURL(/page=/);
    await expect(
      page.locator('#product-list').locator('div').first().or(page.getByText('No Products Found'))
    ).toBeVisible();
  });

  test('should sort by Top Rated and update URL', async ({ page }) => {
    await gotoFindProducts(page);

    await page.getByRole('button', { name: /Sort:/ }).click();
    const sortOption = page.getByRole('menuitem').nth(1);
    const sortName = (await sortOption.innerText()).trim();
    await sortOption.click();

    await expect(page).toHaveURL(new RegExp(`sort=${sortName.replace(/ /g, '\\+')}`));
    await expect(page).not.toHaveURL(/page=/);
    await expect(
      page.locator('#product-list').locator('div').first().or(page.getByText('No Products Found'))
    ).toBeVisible();
  });

  test('should reset all filters', async ({ page }) => {
    await gotoFindProducts(page);

    const searchInput = page.getByPlaceholder('Enter keywords to search...');
    await searchInput.fill('Nike');
    await expect(page).toHaveURL(/search=Nike/);

    await page.getByRole('button', { name: 'All Prices' }).click();
    const priceOption = page.getByRole('menuitem').nth(1);
    const priceName = (await priceOption.innerText()).trim();
    await priceOption.click();
    await expect(page).toHaveURL(
      new RegExp(`price=${encodeURIComponent(priceName).replace(/%20/g, '\\+')}`)
    );

    await page.getByRole('button', { name: /Sort:/ }).click();
    const sortOption = page.getByRole('menuitem').nth(1);
    const sortName = (await sortOption.innerText()).trim();
    await sortOption.click();
    await expect(page).toHaveURL(new RegExp(`sort=${sortName.replace(/ /g, '\\+')}`));

    await page.getByRole('button', { name: 'All Categories' }).click();
    const categoryOption = page.getByRole('menuitem').nth(1);
    const categoryName = (await categoryOption.innerText()).trim();
    await categoryOption.click();
    await expect(page).toHaveURL(new RegExp(`category=${categoryName.replace(/ /g, '\\+')}`));

    await page.getByRole('button', { name: 'All Brands' }).click();
    const brandOption = page.getByRole('menuitem').nth(1);
    const brandName = (await brandOption.locator('span').last().innerText()).trim();
    await brandOption.click();
    await expect(page).toHaveURL(new RegExp(`brand=${brandName.replace(/ /g, '\\+')}`));

    const resetButton = page.getByRole('button', { name: 'Reset' }).last();
    await expect(resetButton).toBeEnabled();
    await resetButton.click();

    await expect(page).toHaveURL(productsPath);
    await expect(searchInput).toHaveValue('');
    await expect(page.getByRole('button', { name: 'All Categories' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'All Brands' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'All Prices' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sort: Newest' })).toBeVisible();
  });

  test('should show empty state for no matches', async ({ page }) => {
    await gotoFindProducts(page);

    const searchInput = page.getByPlaceholder('Enter keywords to search...');
    await searchInput.fill('zzzz-no-products-xyz');

    await expect(page).toHaveURL(/search=zzzz-no-products-xyz/);
    await expect(page.getByText('No Products Found')).toBeVisible();
    await expect(
      page.getByText(
        "We couldn't find any products matching your filters. Try adjusting your search criteria."
      )
    ).toBeVisible();
  });

  test('should open product detail from product card', async ({ page }) => {
    await gotoFindProducts(page);

    const firstCard = page.locator('#product-list').locator('div').first();
    await expect(firstCard).toBeVisible();

    const productLink = firstCard.locator('[href^="/product/"]').first();
    const href = await productLink.getAttribute('href');
    expect(href).toMatch(/^\/product\/.+/);

    await firstCard.click();
    await expect(page).toHaveURL(href!);
  });

  test('should copy product title to clipboard', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await gotoFindProducts(page);

    const firstCard = page.locator('#product-list').locator('div').first();
    await expect(firstCard).toBeVisible();

    const title = (await firstCard.locator('h3 span').last().innerText()).trim();
    expect(title).not.toBe('');

    await firstCard.locator('#product-details button').click();

    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toBe(title);
  });

  test('should preserve category filter when paginating', async ({ page }) => {
    await gotoFindProducts(page);

    await page.getByRole('button', { name: 'All Categories' }).click();
    const categoryOption = page.getByRole('menuitem').nth(1);
    const categoryName = (await categoryOption.innerText()).trim();
    await categoryOption.click();

    await expect(page).toHaveURL(new RegExp(`category=${categoryName.replace(/ /g, '\\+')}`));
    await expect(page).toHaveURL(/category=/);

    const pageTwo = page.getByRole('link', { name: '2', exact: true });
    if (!(await pageTwo.isVisible().catch(() => false))) {
      test.skip();
      return;
    }

    await pageTwo.click();

    await expect(page).toHaveURL(/page=2/);
    await expect(page).toHaveURL(/category=/);
    await expect(page.locator('#product-list').locator('div').first()).toBeVisible();
  });

  test('should reset page to 1 when filter changes', async ({ page }) => {
    await gotoFindProducts(page);

    const pageTwo = page.getByRole('link', { name: '2', exact: true });
    if (!(await pageTwo.isVisible().catch(() => false))) {
      test.skip();
      return;
    }

    await pageTwo.click();
    await expect(page).toHaveURL(/page=2/);

    await page.getByRole('button', { name: /Sort:/ }).click();
    const sortOption = page.getByRole('menuitem').nth(1);
    const sortName = (await sortOption.innerText()).trim();
    await sortOption.click();

    await expect(page).toHaveURL(new RegExp(`sort=${sortName.replace(/ /g, '\\+')}`));
    await expect(page).not.toHaveURL(/page=/);
    await expect(
      page.locator('#product-list').locator('div').first().or(page.getByText('No Products Found'))
    ).toBeVisible();
  });

  test('should disable Reset when no filters are active', async ({ page }) => {
    await gotoFindProducts(page);

    const resetButton = page.getByRole('button', { name: 'Reset' }).last();
    await expect(resetButton).toBeDisabled();
  });

  test('should load Find Products from deep-link URL params', async ({ page }) => {
    await gotoFindProducts(page);

    await page.getByRole('button', { name: 'All Categories' }).click();
    const categoryOption = page.getByRole('menuitem').nth(1);
    if (!(await categoryOption.isVisible().catch(() => false))) {
      test.skip();
      return;
    }

    const categoryName = (await categoryOption.innerText()).trim();

    await gotoFindProductsWithParams(page, {
      search: 'Nike',
      category: categoryName,
      page: '2',
    });

    await expect(page.getByPlaceholder('Enter keywords to search...')).toHaveValue('Nike');
    await expect(page.getByRole('button', { name: categoryName })).toBeVisible();
    await expect(page).toHaveURL(/search=Nike/);
    await expect(page).toHaveURL(/category=/);
    await expect(page).toHaveURL(/page=2/);
    await expect(
      page.locator('#product-list').locator('div').first().or(page.getByText('No Products Found'))
    ).toBeVisible();
  });

  test('should keep combined filters in sync in the URL', async ({ page }) => {
    await gotoFindProducts(page);

    const searchInput = page.getByPlaceholder('Enter keywords to search...');
    await searchInput.fill('Nike');
    await expect(page).toHaveURL(/search=Nike/);
    await expect(searchInput).toHaveValue('Nike');

    await page.getByRole('button', { name: 'All Prices' }).click();
    const priceOption = page.getByRole('menuitem').nth(1);
    const priceName = (await priceOption.innerText()).trim();
    await priceOption.click();
    await expect(page).toHaveURL(/price=/);

    await page.getByRole('button', { name: /Sort:/ }).click();
    const sortOption = page.getByRole('menuitem').nth(1);
    const sortName = (await sortOption.innerText()).trim();
    await sortOption.click();
    await expect(page).toHaveURL(/sort=/);

    await page.getByRole('button', { name: 'All Brands' }).click();
    const brandOption = page.getByRole('menuitem').nth(1);
    const brandName = (await brandOption.locator('span').last().innerText()).trim();
    await brandOption.click();
    await expect(page).toHaveURL(/brand=/);

    await page.getByRole('button', { name: 'All Categories' }).click();
    const categoryOption = page.getByRole('menuitem').nth(1);
    const categoryName = (await categoryOption.innerText()).trim();
    await categoryOption.click();
    await expect(page).toHaveURL(/category=/);

    await expect(page.getByRole('button', { name: categoryName })).toBeVisible();
    await expect(page.getByRole('button', { name: priceName })).toBeVisible();
    await expect(page.getByRole('button', { name: sortName })).toBeVisible();
    await expect(page.getByRole('button', { name: brandName })).toBeVisible();
    await expect(
      page.locator('#product-list').locator('div').first().or(page.getByText('No Products Found'))
    ).toBeVisible();
  });
});
