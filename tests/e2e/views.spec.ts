import { test, expect, Page } from '@playwright/test';

test.describe.serial('Views Basics', () => {
    test.beforeEach( async ({page}) => {
        await page.goto('/');
        await page.evaluate(() => sessionStorage.clear());
    })

    test('homepage displays view count', async ({ page }) => {
        await expect(page.locator('.skeleton-card')).toHaveCount(0);

        const gameCards = page.locator('.game-card');
        const count = await gameCards.count();

        await expect(page.locator('.bi-eye-fill')).toHaveCount(count);
    });

    async function getFirstGameViewCount(page: Page) {
        const firstGameCard = page.locator('.game-card').first();
        const viewStat = firstGameCard.locator('.stat-item').nth(2);
        const text = await viewStat.textContent();

        return parseInt(text?.trim() || '0');
    }

    test('incrementing views on visit', async ({ page }) => {
        await expect(page.locator('.skeleton-card')).toHaveCount(0);
        
        const initialValue = await getFirstGameViewCount(page);
    
        const responsePromise = page.waitForResponse(resp => 
            resp.url().includes('/api/games/') && 
            resp.url().includes('/view') && 
            resp.request().method() === 'POST'
        );
        
        await page.locator('.game-card').first().click();
        await expect(page.locator('.game-title')).toContainText(/Year Walk/);
        await responsePromise;
    
        await page.goto('/'); // Force fresh load instead of back
        await expect(page.locator('.skeleton-card')).toHaveCount(0);
        
        const finalValue = await getFirstGameViewCount(page);
        
        // Test it increased, not exact value (handles concurrent test runs)
        expect(finalValue).toBeGreaterThan(initialValue);
    });

    test('does not increment views on page refresh', async ({ page }) => {
        await expect(page.locator('.skeleton-card')).toHaveCount(0);
        
        const responsePromise = page.waitForResponse(resp => 
            resp.url().includes('/api/games/') && 
            resp.url().includes('/view') && 
            resp.request().method() === 'POST'
        );
        
        await page.locator('.game-card').first().click();
        await expect(page.locator('.game-title')).toContainText(/Year Walk/);
        await responsePromise;
        
        // Verify sessionStorage was set
        const hasSessionKey = await page.evaluate(() => 
            sessionStorage.getItem('viewed_game_1') !== null
        );
        expect(hasSessionKey).toBe(true);
        
        // Setup listener for POST (should NOT happen on reload)
        let postHappened = false;
        page.on('request', req => {
            if (req.url().includes('/view') && req.method() === 'POST') {
                postHappened = true;
            }
        });
        
        await page.reload();
        await expect(page.locator('.game-title')).toContainText(/Year Walk/);
        
        // Verify no POST happened on reload
        expect(postHappened).toBe(false);
    });
});