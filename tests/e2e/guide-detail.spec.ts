import { test, expect } from '@playwright/test';

test.describe('Guide Detail Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/guide.html?id=4');
    });

    test('hero data displays', async ({ page }) => {
        await page.waitForSelector('.guide-hero-title:not(.skeleton-text)');

        await expect(page.locator('.guide-badge')).toHaveText('Main Story');
        await expect(page.locator('.guide-hero-title')).toHaveText('Story Walkthrough');
        await expect(page.locator('.guide-hero-description')).toHaveText('Complete the main story and unlock all story-related achievements. Perfect for first-time players.');

        const metaStats = page.locator('.meta-stat span');
        await expect(metaStats.nth(0)).toHaveText('2-3 hours');
        await expect(metaStats.nth(1)).toHaveText('8 Achievements');

        const difficulty = page.locator('.meta-stat.difficulty');
        await expect(difficulty).toHaveClass(/easy/);
        await expect(difficulty.locator('span')).toHaveText('EASY');

        await expect(page.locator('.guide-icon-large i')).toHaveClass(/bi-lightning-charge-fill/);

        await expect(page.locator('.nav-back')).toHaveAttribute('href', expect.stringContaining('game.html?id=1'));

        await expect(page).toHaveTitle('Story Walkthrough - Year Walk - Achiever');
    });

    test('Section JSON hydration', async ({ page }) => {
        await page.waitForSelector('.guide-tree .skeleton-card', { state: 'detached' });

        const sections = page.locator('.guide-section');
        const gettingStarted = sections.first();
        await expect(gettingStarted).toHaveAttribute('data-section', 'getting-started');
        await expect(gettingStarted.locator('.bi-play-circle')).toBeVisible();
        await expect(gettingStarted.locator('.section-title')).toHaveText('Getting Started');
        await expect(gettingStarted.locator('.section-description')).toContainText(/Begin your Year Walk journey./);
        
        // Assert: verify multiple sections exist
        expect(await sections.count()).toBeGreaterThan(2);
        
        // Verify second section exists
        const secondSection = sections.nth(1);
        await expect(secondSection).toHaveAttribute('data-section', 'the-choice');
        await expect(secondSection.locator('.section-title')).toHaveText('The Choice');
        
        // Assert: confirm the first section contains multiple block types
        const sectionContent = gettingStarted.locator('.section-content');
        expect(await sectionContent.locator('.step-item').count()).toBeGreaterThan(0);
        expect(await sectionContent.locator('.content-block.tip').count()).toBeGreaterThan(0);
        expect(await sectionContent.locator('.content-block.text').count()).toBeGreaterThan(0);
        expect(await sectionContent.locator('.content-block.warning').count()).toBeGreaterThan(0);
        expect(await sectionContent.locator('.content-block.image').count()).toBeGreaterThan(0);
        expect(await sectionContent.locator('.achievement-milestone').count()).toBeGreaterThan(0);
    });

    test('Step blocks display correctly', async ({ page }) => {
        await page.waitForSelector('.guide-tree .skeleton-card', { state: 'detached' });

        const gettingStarted = page.locator('.guide-section').first();
        const stepItems = gettingStarted.locator('.step-item');
        
        expect(await stepItems.count()).toBeGreaterThan(0);
        
        const firstStep = stepItems.first();
        await expect(firstStep.locator('.step-text')).toHaveText('Start a new game and choose your difficulty level');
        
        const stepCheckbox = firstStep.locator('.step-checkbox');
        await expect(stepCheckbox).toBeVisible();
        await expect(stepCheckbox).not.toHaveClass(/completed/);
    });

    test('Content blocks show correct styling', async ({ page }) => {
        await page.waitForSelector('.guide-tree .skeleton-card', { state: 'detached' });

        const gettingStarted = page.locator('.guide-section').first();
        const sectionContent = gettingStarted.locator('.section-content');
        
        // Tip block
        const tipBlock = sectionContent.locator('.content-block.tip').first();
        await expect(tipBlock).toBeVisible();
        await expect(tipBlock.locator('.bi-lightbulb')).toBeVisible();
        await expect(tipBlock.locator('.content-title')).toHaveText('Pro Tip');
        await expect(tipBlock.locator('.content-description')).toContainText(/Choose "Normal" difficulty/);
        
        // Warning block
        const warningBlock = sectionContent.locator('.content-block.warning').first();
        await expect(warningBlock).toBeVisible();
        await expect(warningBlock.locator('.bi-exclamation-triangle')).toBeVisible();
        await expect(warningBlock.locator('.content-title')).toHaveText('Important');
        
        // Text block
        const textBlock = sectionContent.locator('.content-block.text').first();
        await expect(textBlock).toBeVisible();
        await expect(textBlock.locator('.content-title')).toHaveText('Understanding the World');
        expect(await textBlock.locator('.content-description').count()).toBeGreaterThan(1);
        
        // Image block
        const imageBlock = sectionContent.locator('.content-block.image').first();
        await expect(imageBlock).toBeVisible();
        await expect(imageBlock.locator('img')).toHaveAttribute('src', /unsplash/);
        await expect(imageBlock.locator('.content-title')).toHaveText('First Forest Area');
        await expect(imageBlock.locator('.content-description')).toContainText(/glowing mushrooms/);
    });

    test('Achievement milestones sync with game API data', async ({ page }) => {
        await page.waitForSelector('.guide-tree .skeleton-card', { state: 'detached' });

        const gettingStarted = page.locator('.guide-section').first();
        const achievementMilestone = gettingStarted.locator('.achievement-milestone').first();
        
        await expect(achievementMilestone).toBeVisible();
        await expect(achievementMilestone.locator('.milestone-title')).toHaveText('The End');
        await expect(achievementMilestone.locator('.milestone-desc')).toHaveText('Complete Year Walk');
        await expect(achievementMilestone.locator('img')).toHaveAttribute('src', /steamstatic/);
    });
});