import { test, expect } from '@playwright/test';

test('page loads with game ID', async ({ page }) => {
    await page.goto('/game.html?id=1');

    await expect(page.locator('.game-title')).toContainText(/Year Walk/);
});

test('achievements render', async ({ page }) => {
    await page.goto('/game.html?id=1');

    await expect(page.locator('.achievement-card')).toHaveCount(10);
});

test('achievement data displays', async ({ page }) => {
    await page.goto('game.html?id=1');

    const firstAchievement = page.locator('.achievement-card').first();
    await expect(firstAchievement.locator('.achievement-name')).toBeVisible();
    await expect(firstAchievement.locator('.achievement-desc')).toBeVisible();
    await expect(firstAchievement.locator('img')).toHaveAttribute('src', /.+/);
});