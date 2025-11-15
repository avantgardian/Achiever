import { test, expect } from '@playwright/test';

test.describe('Guide Detail Page', () => {
    test('hero data displays', async ({ page }) => {
        await page.goto('/guide.html?id=4');
        await page.waitForSelector('.guide-hero-title:not(.skeleton-text)');

        await expect(page.locator('.guide-badge')).toHaveText('Main Story');
        await expect(page.locator('.guide-hero-title')).toHaveText('Story Walkthrough');
        await expect(page.locator('.guide-hero-description')).toHaveText('Complete the main story and unlock all story-related achievements. Perfect for first-time players.');

        const metaStats = page.locator('.meta-stat span');
        await expect(metaStats.nth(0)).toHaveText('2-3 hours');
        await expect(metaStats.nth(1)).toHaveText('6 Achievements');

        const difficulty = page.locator('.meta-stat.difficulty');
        await expect(difficulty).toHaveClass(/easy/);
        await expect(difficulty.locator('span')).toHaveText('EASY');

        await expect(page.locator('.guide-icon-large i')).toHaveClass(/bi-lightning-charge-fill/);

        await expect(page.locator('.nav-back')).toHaveAttribute('href', expect.stringContaining('game.html?id=1'));

        await expect(page).toHaveTitle('Story Walkthrough - Year Walk - Achiever');
    });

    test('Section JSON hydration', async ({ page }) => {
        await page.goto('/guide.html?id=4');
        await page.waitForSelector('.guide-tree .skeleton-card', { state: 'detached' }); // Wait for the skeleton cards to be detached

        const gettingStarted = page.locator('.guide-section').first();
        await expect(gettingStarted).toHaveAttribute('data-section', 'getting-started');
        await expect(gettingStarted.locator('.bi-play-circle')).toBeVisible();
        await expect(gettingStarted.locator('.section-title')).toHaveText('Getting Started');
        await expect(gettingStarted.locator('.section-description')).toContainText(/Begin your Year Walk journey./);
        
    });
});