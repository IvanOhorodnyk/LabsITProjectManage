const { test, expect } = require('@playwright/test');
const path = require('path');

test('РљСЂРёС‚РёС‡РЅРёР№ С€Р»СЏС…: РџРµСЂРµРІС–СЂРєР° Р·Р°РІР°РЅС‚Р°Р¶РµРЅРЅСЏ РіРѕР»РѕРІРЅРѕС— СЃС‚РѕСЂС–РЅРєРё', async ({ page }) => {
    const filePath = `file:///${path.resolve(__dirname, '../frontend/layout/index.html')}`;
    await page.goto(filePath);

    await expect(page).toHaveTitle(/Labs IT Project Manage MVP/);

    const header = page.locator('header h1');
    await expect(header).toBeVisible();
    await expect(header).toHaveText('Welcome to the IT Project Management MVP');

    const mainText = page.locator('main p');
    await expect(mainText).toContainText('This is a basic layout');

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
});