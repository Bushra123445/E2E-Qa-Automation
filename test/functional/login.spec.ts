import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('End to End User Flow', () => {

  test('Login → Dashboard → All Pages → Logout', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await test.step('Open Login Page', async () => {
      await loginPage.goto();
    });

    await test.step('Verify Login Page', async () => {
      await expect(loginPage.username).toBeVisible();
      await expect(loginPage.password).toBeVisible();
      await expect(loginPage.loginButton).toBeVisible();
    });

    await test.step('Login', async () => {
      await loginPage.loginWithValidCredentials();
    });

    await test.step('Verify Dashboard', async () => {
      await expect(page).toHaveURL(/dashboard\.html/);
    });
  });

});
