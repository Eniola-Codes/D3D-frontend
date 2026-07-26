import { test as setup } from '@playwright/test';
import path from 'path';
import { loginViaUI } from '../helpers/auth';

const authFile = path.join(__dirname, '../../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  await loginViaUI(page);
  await page.context().storageState({ path: authFile });
});