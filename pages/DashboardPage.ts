import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly dashboardHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
  }

  async goto() {
    await this.page.goto('/app/dashboard.html');
  }

  async verifyDashboard() {
    await this.dashboardHeading.waitFor({ state: 'visible' });
  }

  async goToProfile() {
    await this.page.goto('/app/profile.html');
  }

  async goToSettings() {
    await this.page.goto('/app/settings.html');
  }

  async goToStudent() {
    await this.page.goto('/app/student.html');
  }

  async goToCharts() {
    await this.page.goto('/app/charts.html');
  }
}