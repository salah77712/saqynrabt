import { test, expect } from '@playwright/test';

test.describe('SAQYN RABT Enterprise Portal E2E Flow', () => {
  test('should load landing page correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/SAQYN/);
  });

  test('should simulate dashboard views and interactions', async ({ page }) => {
    // Navigate straight to dashboard demo which supports mock mode
    await page.goto('/dashboard');
    
    // Check main title exists
    await expect(page.locator('text=Command Center')).toBeVisible();

    // Verify Chat assistant tab load
    await page.click('text=Chat');
    await expect(page.locator('placeholder=Ask a question...')).toBeVisible();

    // Verify automation dashboard queue load
    await page.click('text=Automation');
    await expect(page.locator('text=Pending')).toBeVisible();
  });
});
