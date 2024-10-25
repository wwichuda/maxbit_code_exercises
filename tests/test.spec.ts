import { test, expect } from '@playwright/test';

test('Validate the items in the cart match with the added items ', async ({ page }) => {
  await page.goto('https://www.powerbuy.co.th/th/');
});
