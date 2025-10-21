import { test, expect } from '@playwright/test';

test.describe('Homepage Basics', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('page loads successfully', async ({ page }) => {
        await expect(page).toHaveTitle(/Achiever/);
    });

    test('has searchbar', async ({ page }) => {
        await expect(page.locator('#gameSearch')).toBeVisible();
    });

    test('displays at least one game card', async ({ page }) => {
        await expect(page.locator('.skeleton-card')).toHaveCount(0);
        await expect(page.locator('.game-card').first()).toBeVisible();
    });
});