import { test, expect } from '@playwright/test';

test.describe('Game Detail Page', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/game.html?id=1');
    });

    test('page loads with game ID', async ({ page }) => {
        await expect(page.locator('.game-title')).toContainText(/Year Walk/);
    });

    test('achievements render', async ({ page }) => {
        await expect(page.locator('.achievement-card')).toHaveCount(10);
    });

    test('achievement data displays', async ({ page }) => {
        const firstAchievement = page.locator('.achievement-card').first();
        await expect(firstAchievement.locator('.achievement-name')).toBeVisible();
        await expect(firstAchievement.locator('.achievement-desc')).toBeVisible();
        await expect(firstAchievement.locator('img')).toHaveAttribute('src', /.+/);
    });

    test('guides data displays', async ({ page }) => {
        const firstGuide = page.locator('.guide-card').first();
        
        await expect(firstGuide.locator('.guide-title')).toBeVisible();
        await expect(firstGuide.locator('.guide-description')).toBeVisible();
        await expect(firstGuide.locator('.guide-stats')).toBeVisible();
    });
});