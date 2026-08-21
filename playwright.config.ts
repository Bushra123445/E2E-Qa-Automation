import { defineConfig, devices } from '@playwright/test';

const baseURL =
  process.env.BASE_URL ||
  'https://bushra123445.github.io/E2E-Qa-Automation';

export default defineConfig({
  testDir: './test',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 2 : undefined,

  timeout: 30_000,

  expect: {
    timeout: 10_000,
  },

  reporter: [
    ['line'],
    ['html', { open: 'never' }],
    ['allure-playwright'],
  ],

  use: {
     baseURL: 'https://YOUR-GITHUB-USERNAME.github.io/E2E-Qa-Automation/',

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
