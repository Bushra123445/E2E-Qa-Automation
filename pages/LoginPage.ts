import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly message: Locator;

  constructor(page: Page) {
    this.page = page;

    this.username = page.locator('#username');
    this.password = page.locator('#password');
    this.loginButton = page.locator('#loginButton');
    this.message = page.locator('#message');
  }

  async goto() {
    await this.page.goto('login.html', {
      waitUntil: 'domcontentloaded',
    });

    await expect(this.username).toBeVisible({
      timeout: 15000,
    });

    await expect(this.password).toBeVisible({
      timeout: 15000,
    });

    await expect(this.loginButton).toBeVisible({
      timeout: 15000,
    });
  }

  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);

    await this.loginButton.click();
  }

  async loginWithValidCredentials() {
    await this.login('admin@example.com', 'Admin@123');
  }
}
