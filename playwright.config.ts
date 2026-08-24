import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './test',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 2 : undefined,

  reporter: [
    ['line'],
    ['html', { open: 'never' }],
    ['allure-playwright'],
  ],

  use: {
    // Local = http://127.0.0.1:5500
    // GitHub Actions = BASE_URL environment variable
    baseURL: process.env.BASE_URL || 'http://127.0.0.1:5500',

    headless: true,

    viewport: {
      width: 1366,
      height: 768,
    },

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    trace: 'retain-on-failure',

    actionTimeout: 15000,

    navigationTimeout: 30000,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});
