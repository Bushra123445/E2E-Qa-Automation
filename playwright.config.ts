import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // ==========================================
  // TEST DIRECTORY
  // ==========================================
  testDir: './test',

  // ==========================================
  // TEST EXECUTION
  // ==========================================
  fullyParallel: true,
  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 2 : undefined,

  // ==========================================
  // REPORTERS
  // ==========================================
  reporter: [
    ['html', {
      outputFolder: 'playwright-report',
      open: 'never',
    }],

    ['allure-playwright', {
      resultsDir: 'allure-results',
    }],
  ],

  // ==========================================
  // SHARED TEST SETTINGS
  // ==========================================
  use: {
    /*
     * IMPORTANT:
     * The website files are inside /app.
     * Therefore the local CI web server below
     * serves the /app folder as its document root.
     */
    baseURL: 'http://127.0.0.1:8081',

    screenshot: 'on',

    video: 'on',

    trace: 'on',

    headless: true,

    viewport: {
      width: 1366,
      height: 768,
    },

    actionTimeout: 15000,

    navigationTimeout: 30000,
  },

  // ==========================================
  // BROWSER PROJECTS
  // ==========================================
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

  // ==========================================
  // LOCAL WEB SERVER
  // ==========================================
  /*
   * IMPORTANT:
   * Serve ./app instead of the repository root.
   *
   * This makes:
   *
   * http://127.0.0.1:8081/login.html
   *
   * point to:
   *
   * ./app/login.html
   */
  webServer: {
    command: 'npx http-server ./app -p 8081',

    url: 'http://127.0.0.1:8081',

    reuseExistingServer: true,

    timeout: 120000,
  },
});
