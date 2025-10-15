import { test, expect } from '@playwright/test';

/* 
  - [ ] **Test: Homepage skeleton removal**
  - Load homepage
  - Verify `.skeleton-card` elements exist initially
  - Wait for data to load
  - Verify `.skeleton-card` elements are gone
  - Hint: Use `toBeVisible()` then `not.toBeVisible()` or `toHaveCount(0)`

- [ ] **Test: Game detail skeleton removal**
  - Load game detail page
  - Verify `.skeleton-text` on title exists initially
  - Wait for game data
  - Verify skeleton classes removed, real data appears
  - Hint: Wait for response or use `waitForSelector` with state option 
*/

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