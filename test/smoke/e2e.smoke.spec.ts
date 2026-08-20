import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';

test.describe('Smoke Tests', () => {

  test('Critical user journey should work', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    // Login
    await loginPage.goto();

    await loginPage.login('admin', 'admin123');

    // Dashboard
    await expect(page).toHaveURL(/dashboard\.html/);
    await dashboardPage.verifyDashboard();

    // Critical pages
    await dashboardPage.goToProfile();
    await expect(page).toHaveURL(/profile\.html/);

    await dashboardPage.goToSettings();
    await expect(page).toHaveURL(/settings\.html/);

    await dashboardPage.goToStudent();
    await expect(page).toHaveURL(/student\.html/);

    await dashboardPage.goToCharts();
    await expect(page).toHaveURL(/charts\.html/);

    // Logout
    await page.goto('/app/dashboard.html');

    await page.getByRole('link', { name: /logout/i }).click();

    await expect(page).toHaveURL(/login\.html/);
    await expect(loginPage.username).toBeVisible();
  });

});