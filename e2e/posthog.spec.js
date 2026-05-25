import { test, expect } from '@playwright/test';

test('trigger posthog events', async ({ page }) => {
  page.on('response', response => {
    if (response.url().includes('posthog')) {
      console.log('POSTHOG RESP:', response.url(), response.status());
    }
  });
  
  await page.goto('https://labs-it-project-manage.vercel.app/');
  
  // Wait a bit for PostHog to init
  await page.waitForTimeout(3000);
  
  // Type task
  await page.fill('#task-input', 'My AI test task');
  await page.click('#add-task-btn'); // Triggers task_created
  
  await page.waitForTimeout(2000);
  
  // Delete task
  await page.click('#task-list button'); // Triggers task_deleted
  
  await page.waitForTimeout(3000);
});
