const { test, expect } = require('@playwright/test');
const path = require('path');

test('Page loads successfully', async ({ page }) => {
    const filePath = `file:///${path.resolve(__dirname, '../frontend/layout/index.html')}`;
    await page.goto(filePath);
    await expect(page).toHaveTitle(/Labs IT Project Manage MVP/);
    const header = page.locator('header h1');
    await expect(header).toBeVisible();
});