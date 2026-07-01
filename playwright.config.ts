import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: 'html',
  timeout: 30 * 1000,
  expect: {
    timeout: 15_000,
  },
  use: {
    baseURL: process.env.BASE_URL,
    headless: !!process.env.CI,
    screenshot: 'on',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], baseURL: process.env.BASE_URL },
    },
  ],
  webServer: {
    command: 'npm run start',
    url: process.env.BASE_URL,
    reuseExistingServer: !process.env.CI,
  },
});
