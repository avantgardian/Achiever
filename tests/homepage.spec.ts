import { test, expect } from '@playwright/test';

test('page loads successfully', async ({ page }) => {
    await page.goto('/');
  
    await expect(page).toHaveTitle(/Achiever/);
});

test('has searchbar', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('#gameSearch')).toBeVisible();
});

test('displays at least one game card', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('.skeleton-card')).toHaveCount(0);
    await expect(page.locator('.game-card').first()).toBeVisible();
});