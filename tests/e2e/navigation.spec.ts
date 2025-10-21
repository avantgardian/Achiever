import { test, expect } from '@playwright/test';

test.describe('Page Navigation', () => {

    test('clicking game card navigates to game detail page', async ({ page }) => {
        await page.goto('/');

        await expect(page.locator('.skeleton-card')).toHaveCount(0);
        await page.locator('.game-card').first().click();
        await expect(page).toHaveURL(/game\.html\?id=/);
    });

    test('back button returns to homepage', async ({ page }) => {
        await page.goto('/game.html?id=1');

        await page.locator('.nav-back').click();
        await expect(page).toHaveURL(/index\.html/);
    });
});