import { test, expect } from '@playwright/test';

test.describe('Loading States', () => {

    test('homepage skeleton card appears and then disappears', async ({ page }) => {
        await page.route('**/api/games', async route => { // Intercept
            // Wait 1 second before continuing
            await new Promise(resolve => setTimeout(resolve, 1000));
            // Then let the real request go through
            await route.continue();
        });

        await page.goto('/', { waitUntil: 'domcontentloaded' });

        await expect(page.locator('.skeleton-card').first()).toBeVisible();
        await expect(page.locator('.game-card').first()).toBeVisible();
        await expect(page.locator('.skeleton-card')).toHaveCount(0);
    });

    test('game detail skeleton elements appear and then disappear', async ({ page }) => {
        await page.route('**/api/games/*', async route => { // Intercept
            await new Promise(resolve => setTimeout(resolve, 1000));
            await route.continue();
        });

        await page.route('**/api/games/*/achievements', async route => { // Intercept
            await new Promise(resolve => setTimeout(resolve, 1000));
            await route.continue();
        });

        await page.goto('/game.html?id=1', { waitUntil: 'domcontentloaded' });
        await expect(page.locator('.skeleton-card').first()).toBeVisible();
        await expect(page.locator('.skeleton-text').first()).toBeVisible();

        await expect(page.locator('.achievement-card').first()).toBeVisible();
        await expect(page.locator('.game-title')).toBeVisible();

        await expect(page.locator('.skeleton-card')).toHaveCount(0);
        await expect(page.locator('.skeleton-text')).toHaveCount(0);
    });
});