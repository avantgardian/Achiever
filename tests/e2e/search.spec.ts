import { test, expect } from '@playwright/test';

test.describe('Homepage Search', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('.skeleton-card')).toHaveCount(0);
        await expect(page.locator('.game-card').first()).toBeVisible();
    });

    test('filters games by name', async ({ page }) => {
        await page.locator('#gameSearch').fill('snow');
        await page.waitForTimeout(350); // slightly longer than 300ms debounce
        
        const gameCards = await page.locator('.game-card').all();

        for (const card of gameCards) {
            const cardText = await card.textContent();
            expect(cardText?.toLowerCase()).toContain('snow');
        }
    });

    test('search is case-insensitive', async ({ page }) => {
        await page.locator('#gameSearch').fill('SNOW');
        await page.waitForTimeout(350); // slightly longer than 300ms debounce
        
        const gameCards = await page.locator('.game-card').all();

        for (const card of gameCards) {
            const cardText = await card.textContent();
            expect(cardText?.toLowerCase()).toContain('snow');
        }
    });

    test('empty search shows all games', async ({ page }) => {
        const initialCount = await page.locator('.game-card').count();
        await page.locator('#gameSearch').fill('SNOW');
        await page.waitForTimeout(350); // slightly longer than 300ms debounce

        await page.locator('#gameSearch').clear();
        await page.waitForTimeout(350); // slightly longer than 300ms debounce

        await expect(page.locator('.game-card')).toHaveCount(initialCount);
    });

    test('no matches shows empty state', async ({ page }) => {
        await page.locator('#gameSearch').fill('SNSQHRZYO88');
        await page.waitForTimeout(350); // slightly longer than 300ms debounce

        await expect(page.locator('.empty-state')).toBeVisible();
        await expect(page.locator('.empty-state')).toContainText('No games found');
    });

    test('partial matching works', async ({ page }) => {
        const searchFill = ['road', 'year', 'run'];

        for (const search of searchFill) {

            await page.locator('#gameSearch').fill(search);
            await page.waitForTimeout(350); // slightly longer than 300ms debounce
            
            const gameCards = await page.locator('.game-card').all();

            for (const card of gameCards) {
                const cardText = await card.textContent();
                expect(cardText?.toLowerCase()).toContain(search);
            }
        }
    });
});
