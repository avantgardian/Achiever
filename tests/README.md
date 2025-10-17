# Testing Structure

This project uses a two-tiered testing approach:

## 📁 tests/e2e/ - End-to-End Tests (Playwright)

**Purpose:** Test full user flows in a real browser

**Technology:** Playwright

**Run with:**
```bash
npm run test:e2e          # Run all E2E tests
npm run test:e2e:ui       # Run with interactive UI
npm run test:e2e:headed   # Run with visible browser
```

**What they test:**
- Full page loads
- User interactions (clicks, typing, navigation)
- API integration
- Visual rendering
- Cross-browser compatibility

**Example:**
```javascript
test('user can navigate to game detail page', async ({ page }) => {
  await page.goto('/');
  await page.click('.game-card:first-child');
  await expect(page).toHaveURL(/game\.html\?id=\d+/);
});
```

---

## 📁 tests/unit/ - Unit Tests (Vitest)

**Purpose:** Test individual functions in isolation

**Technology:** Vitest

**Run with:**
```bash
npm run test:unit         # Run once
npm run test:unit:watch   # Run in watch mode (auto-rerun on changes)
npm run test:unit:ui      # Run with interactive UI
```

**What they test:**
- Pure functions
- Helper utilities
- Calculations and logic
- Edge cases

**Example:**
```javascript
test('calculateProgress returns correct percentage', () => {
  expect(calculateProgress(5, 10)).toBe(50);
  expect(calculateProgress(0, 0)).toBe(0);
});
```

---

## Running All Tests

```bash
npm test    # Runs unit tests THEN E2E tests
```

---

## When to Use Each Type

### Use Unit Tests (Vitest) when:
- Testing pure functions (input → output)
- Testing calculations, filters, formatters
- Need to test many edge cases quickly
- No browser/DOM needed

### Use E2E Tests (Playwright) when:
- Testing user flows
- Testing page navigation
- Testing API integration
- Testing visual/UI behavior
- Need to verify in real browser

---

## TDD Workflow

### For Unit Tests:
1. Write test in `tests/unit/*.test.js`
2. Run `npm run test:unit:watch`
3. Watch it fail (RED 🔴)
4. Implement function in `docs/js/*.js`
5. Watch it pass (GREEN 🟢)
6. Refactor if needed

### For E2E Tests:
1. Write test in `tests/e2e/*.spec.ts`
2. Run `npm run test:e2e:headed`
3. Watch it fail (RED 🔴)
4. Build feature in frontend/backend
5. Watch it pass (GREEN 🟢)
6. Refactor if needed

