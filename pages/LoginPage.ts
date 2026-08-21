
import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly togglePassword: Locator;
  readonly message: Locator;

  constructor(page: Page) {
    this.page = page;

    this.username = page.locator('#username');
    this.password = page.locator('#password');
    this.loginButton = page.locator('#loginButton');
    this.togglePassword = page.locator('#togglePassword');
    this.message = page.locator('#message');
  }

  async goto() {
    await this.page.goto('login.html', {
      waitUntil: 'domcontentloaded',
    });

    await expect(this.username).toBeVisible({
      timeout: 15000,
    });
  }

  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async verifyLoginPage() {
    await expect(this.username).toBeVisible();
    await expect(this.password).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }
}
