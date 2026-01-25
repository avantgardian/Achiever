import { Page, Locator } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly gameCards: Locator;
    readonly skeletonCards: Locator;
    readonly title: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.locator('#gameSearch');
        this.gameCards = page.locator('.game-card');
        this.skeletonCards = page.locator('.skeleton-card');
        this.title = page.locator('title');
    }

    async goto() {
        await this.page.goto('/');
    }

    async hasSearchBar() {
        return await this.searchInput.isVisible();
    }

    async getGameCardCount() {
        return await this.gameCards.count();
    }

    async waitForGameCards() {
        await this.skeletonCards.waitFor({ state: 'detached' });
        await this.gameCards.first().waitFor({ timeout: 10000 });
    }

    async getFirstGameCard() {
        await this.waitForGameCards();
        return this.gameCards.first();
    }

    async getTitle() {
        return await this.page.title();
    }
}