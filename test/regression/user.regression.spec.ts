import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';

test.describe('Regression Tests', () => {

  test('Complete user journey regression', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    // Login
    await loginPage.goto();

    await expect(loginPage.username).toBeVisible();
    await expect(loginPage.password).toBeVisible();

    await loginPage.login('admin', 'admin123');

    // Dashboard
    await expect(page).toHaveURL(/dashboard\.html/);
    await dashboardPage.verifyDashboard();

    // Profile
    await dashboardPage.goToProfile();
    await expect(page).toHaveURL(/profile\.html/);

    // Settings
    await dashboardPage.goToSettings();
    await expect(page).toHaveURL(/settings\.html/);

    // Student
    await dashboardPage.goToStudent();
    await expect(page).toHaveURL(/student\.html/);

    // Charts
    await dashboardPage.goToCharts();
    await expect(page).toHaveURL(/charts\.html/);

    // Return to dashboard
    await page.goto('/app/dashboard.html');

    await expect(page).toHaveURL(/dashboard\.html/);

    // Logout
    await page.getByRole('link', { name: /logout/i }).click();

    await expect(page).toHaveURL(/login\.html/);
    await expect(loginPage.username).toBeVisible();
  });

});