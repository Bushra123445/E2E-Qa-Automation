import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  // ==========================================================
  // TEST DIRECTORY
  // ==========================================================
  testDir: './test',

  // Run tests in parallel
  fullyParallel: true,

  // Prevent accidental test.only in CI
  forbidOnly: !!process.env.CI,

  // Retry failed tests in CI
  retries: process.env.CI ? 2 : 0,

  // Workers
  workers: process.env.CI ? 2 : undefined,

  // ==========================================================
  // TEST TIMEOUT
  // ==========================================================
  timeout: 30 * 1000,

  expect: {
    timeout: 10 * 1000,
  },

  // ==========================================================
  // REPORTERS
  // ==========================================================
  reporter: [
    ['list'],
    ['html', {
      outputFolder: 'playwright-report',
      open: 'never',
    }],
    ['allure-playwright'],
  ],

  // ==========================================================
  // GLOBAL SETTINGS
  // ==========================================================
  use: {

    // --------------------------------------------------------
    // LOCAL:
    // http://127.0.0.1:8081
    //
    // CI:
    // GitHub Pages URL
    // --------------------------------------------------------
    baseURL:
      process.env.PLAYWRIGHT_BASE_URL ||
      'http://127.0.0.1:8081',

    // Browser
    headless: true,

    // Browser viewport
    viewport: {
      width: 1366,
      height: 768,
    },

    // --------------------------------------------------------
    // Screenshots
    // --------------------------------------------------------
    screenshot: 'on',

    // --------------------------------------------------------
    // Video
    // --------------------------------------------------------
    video: 'on',

    // --------------------------------------------------------
    // Trace
    // --------------------------------------------------------
    trace: 'on',

    // --------------------------------------------------------
    // Action timeout
    // --------------------------------------------------------
    actionTimeout: 15 * 1000,

    // --------------------------------------------------------
    // Navigation timeout
    // --------------------------------------------------------
    navigationTimeout: 30 * 1000,

    // --------------------------------------------------------
    // Ignore HTTPS errors
    // --------------------------------------------------------
    ignoreHTTPSErrors: true,
  },


  // ==========================================================
  // BROWSER PROJECTS
  // ==========================================================
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


  // ==========================================================
  // LOCAL WEB SERVER
  // ==========================================================
  //
  // LOCAL:
  // npm test
  // → starts app on 127.0.0.1:8081
  //
  // CI:
  // GitHub Actions
  // → webServer disabled
  // → tests use PLAYWRIGHT_BASE_URL
  //
  // ==========================================================

  webServer: process.env.CI
    ? undefined
    : {
        command: 'npx http-server app -p 8081',
        url: 'http://127.0.0.1:8081',
        reuseExistingServer: true,
        timeout: 120 * 1000,
      },

});

