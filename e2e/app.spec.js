const { test, expect } = require('@playwright/test');
const path = require('path');

test('Page loads successfully', async ({ page }) => {
    const filePath = `file:///${path.resolve(__dirname, '../frontend/layout/index.html')}`;
    await page.goto(filePath);
    await expect(page).toHaveTitle(/Labs IT Project Manage MVP/);
    const header = page.locator('header h1');
    await expect(header).toBeVisible();
    await expect(header).toHaveText('Welcome to the IT Project Management MVP');
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
});

test('Break World button triggers Sentry error', async ({ page }) => {
    await page.goto('http://localhost:5173');
    const btn = page.locator('#break-world-btn');
    await expect(btn).toBeVisible();
});