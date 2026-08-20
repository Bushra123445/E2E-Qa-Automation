import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('End to End User Flow', () => {

  test('Login → Dashboard → All Pages → Logout', async ({ page }) => {

    const loginPage = new LoginPage(page);

    // ==============================
    // LOGIN
    // ==============================

    await test.step('Login', async () => {

      await loginPage.goto();

      await expect(loginPage.username).toBeVisible();
      await expect(loginPage.password).toBeVisible();

      await loginPage.login('admin', 'admin123');

      await expect(page).toHaveURL(/dashboard\.html/);

      await expect(
        page.getByRole('heading', {
          name: 'Dashboard',
          exact: true
        })
      ).toBeVisible();

    });


    // ==============================
    // PROFILE
    // ==============================

    await test.step('Navigate to Profile', async () => {

      await page.locator('a[href="profile.html"]').first().click();

      await expect(page).toHaveURL(/profile\.html/);

      // Verify Profile page loaded
      await expect(page.locator('body')).toBeVisible();

    });


    // ==============================
    // SETTINGS
    // ==============================

    await test.step('Navigate to Settings', async () => {

      await page.locator('a[href="settings.html"]').first().click();

      await expect(page).toHaveURL(/settings\.html/);

      // Verify Settings page loaded
      await expect(page.locator('body')).toBeVisible();

    });


    // ==============================
    // STUDENTS
    // ==============================

    await test.step('Navigate to Students', async () => {

      await page.locator('a[href="student.html"]').first().click();

      await expect(page).toHaveURL(/student\.html/);

      // Verify Students page loaded
      await expect(page.locator('body')).toBeVisible();

    });


    // ==============================
    // RETURN TO DASHBOARD
    // ==============================

    await test.step('Return to Dashboard', async () => {

      await page.locator('a[href="dashboard.html"]').first().click();

      await expect(page).toHaveURL(/dashboard\.html/);

      await expect(
        page.getByRole('heading', {
          name: 'Dashboard',
          exact: true
        })
      ).toBeVisible();

    });


    // ==============================
    // LOGOUT
    // ==============================

    await test.step('Logout', async () => {

      await page.locator('a[href="login.html"]').first().click();

      await expect(page).toHaveURL(/login\.html/);

      await expect(loginPage.username).toBeVisible();
      await expect(loginPage.password).toBeVisible();

    });

  });

});
