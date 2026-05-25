const { test, expect } = require('@playwright/test');
const path = require('path');

test('Критичний шлях: Перевірка завантаження головної сторінки', async ({ page }) => {
    // Відкриваємо локальний файл (для простоти замість підняття сервера)
    const filePath = `file:///${path.resolve(__dirname, '../frontend/layout/index.html')}`;
    await page.goto(filePath);

    // Перевіряємо, чи сторінка має правильний заголовок (title)
    await expect(page).toHaveTitle(/Labs IT Project Manage MVP/);

    // Перевіряємо, чи відображається заголовок h1 з очікуваним текстом
    const header = page.locator('header h1');
    await expect(header).toBeVisible();
    await expect(header).toHaveText('Welcome to the IT Project Management MVP');

    // Перевіряємо наявність тексту у блоці main
    const mainText = page.locator('main p');
    await expect(mainText).toContainText('This is a basic layout');

    // Перевіряємо наявність футера
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
});
