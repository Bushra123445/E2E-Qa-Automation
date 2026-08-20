import { expect, Page } from '@playwright/test';

export async function verifyPageLoaded(
  page: Page,
  heading: string
) {
  await expect(
    page.getByRole('heading', { name: heading })
  ).toBeVisible();
}

export async function waitForPageLoad(page: Page) {
  await page.waitForLoadState('domcontentloaded');
}

export async function logout(page: Page) {
  const logoutButton = page.getByRole('button', { name: /logout/i });

  if (await logoutButton.isVisible()) {
    await logoutButton.click();
  }
}