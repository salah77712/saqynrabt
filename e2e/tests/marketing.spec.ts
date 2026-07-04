import { test, expect } from '@playwright/test';

test.describe('Marketing & SEO Checks', () => {
  test('should load features page and render items', async ({ page }) => {
    await page.goto('/features');
    await expect(page.locator('text=One Platform')).toBeVisible();
  });

  test('should load pricing details', async ({ page }) => {
    await page.goto('/pricing');
    await expect(page.locator('text=Starter')).toBeVisible();
  });
});
