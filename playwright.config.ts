
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './test',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 2 : undefined,

  timeout: 30_000,

  expect: {
    timeout: 15_000,
  },

  reporter: [
    ['line'],
    ['html', { open: 'never' }],
    ['allure-playwright'],
  ],

  use: {
    baseURL:
      process.env.BASE_URL ||
      'http://127.0.0.1:5500',

    headless: true,

    screenshot: 'on',

    video: 'on',

    trace: 'on',

    actionTimeout: 15_000,

    navigationTimeout: 30_000,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
  ],
});
