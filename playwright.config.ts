import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'html',
  timeout: process.env.CI ? 60_000 : 30_000,
  expect: {
    timeout: process.env.CI ? 15_000 : 5000,
  },
  use: {
    baseURL: process.env.BASE_URL ?? 'http://localhost:3000',
    headless: !!process.env.CI,
    screenshot: 'on',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.BASE_URL ?? 'http://localhost:3000',
      },
    },
  ],
  ...(!process.env.CI
    ? {
        webServer: {
          command: 'npm run start',
          url: process.env.BASE_URL ?? 'http://localhost:3000',
          reuseExistingServer: true,
          timeout: 60_000,
        },
      }
    : {}),
});
