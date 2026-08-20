import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  // ==============================
  // Test Directory
  // ==============================
  testDir: './test',

  // ==============================
  // Test Execution
  // ==============================
  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  // ==============================
  // Reporters
  // ==============================
  reporter: [
    ['html', {
      outputFolder: 'playwright-report',
      open: 'never',
    }],

    ['allure-playwright', {
      resultsDir: 'allure-results',
    }],
  ],

  // ==============================
  // Shared Test Settings
  // ==============================
  use: {

    // Base URL
    baseURL: 'http://127.0.0.1:8081',

    // Screenshot
    screenshot: 'on',

    // Video
    video: 'on',

    // Trace
    trace: 'on',

    // Browser
    headless: true,

    // Viewport
    viewport: {
      width: 1366,
      height: 768,
    },

    // Timeouts
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },

  // ==============================
  // Browser Projects
  // ==============================
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

  // ==============================
  // Local Web Server
  // ==============================
  webServer: {
    command: 'npx http-server . -p 8081',
    url: 'http://127.0.0.1:8081',
    reuseExistingServer: true,
  },
});