import { expect, Page } from '@playwright/test';
import { routes } from '@/lib/constants/page-routes';

export async function openLoginPage(page: Page) {
  await page.goto('/');
  await page.getByRole('button', { name: 'Get Started' }).click();
}

export async function openSignupPage(page: Page) {
  await openLoginPage(page);
  await page.getByRole('button', { name: /signup/i }).click();
}

export async function openForgotPasswordPage(page: Page) {
  await openLoginPage(page);
  await page.getByRole('button', { name: 'Forgot your password?' }).click();
}

export async function loginViaUI(
  page: Page,
  {
    email = process.env.TEST_EMAIL as string,
    password = '12345678',
  }: { email?: string; password?: string } = {}
) {
  await openLoginPage(page);
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'login' }).click();

  await page.locator('span[data-slot="breadcrumb-page"]').waitFor();
  await expect(page.locator('span[data-slot="breadcrumb-page"]')).toHaveText('Dashboard');
  await expect(page.getByTestId('dropdown-menu-trigger')).toBeVisible();
}

export async function expectDashboard(page: Page) {
  await page.locator('span[data-slot="breadcrumb-page"]').waitFor();
  await expect(page.locator('span[data-slot="breadcrumb-page"]')).toHaveText('Dashboard');
  await expect(page.getByTestId('dropdown-menu-trigger')).toBeVisible();
}

export function accountAuthUrl(auth: string, extra: Record<string, string> = {}) {
  const params = new URLSearchParams({
    [routes.account.keys.auth]: auth,
    ...extra,
  });
  return `${routes.account.path.base}?${params.toString()}`;
}
