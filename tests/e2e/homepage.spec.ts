import { test, expect } from '@playwright/test';
import { HomePage } from './pages/homepage';

test.describe('Homepage Basics', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
  });

  test('page loads successfully', async ({ page }) => {
    const homePage = new HomePage(page);
    const title = await homePage.getTitle();
    expect(title).toContain('Achiever');
  });

  test('has searchbar', async ({ page }) => {
    const homePage = new HomePage(page);
    expect(await homePage.hasSearchBar()).toBe(true);
  });

  test('displays at least one game card', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.waitForGameCards();
    expect(await homePage.getGameCardCount()).toBeGreaterThan(0);
    const firstGameCard = await homePage.getFirstGameCard();
    expect(firstGameCard).toBeVisible();
  });
});