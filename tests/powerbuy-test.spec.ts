import { test, expect } from '@playwright/test';

test('Validate the items in the cart match with the added items', async ({ page }) => {

  // Step 1: Access the website
  await page.goto('https://www.powerbuy.co.th/th/');

  // Step 2: Search for the keyword “TV”
  await page.fill('input[id="search-input"]', 'TV');
  await page.click('button[type="submit"]');

 // Step 3: Filter for 44 - 55 inch TVs and add one to the cart
  await page.click('//button[.//span[contains(text(), "ตัวกรอง")]]');
  await page.click('//span[contains(text(), "ช่วงขนาดหน้าจอ (นิ้ว)"]');
  await page.locator('//label[contains(text()//input, "44 - 55 inches"]').check();
  await page.click('//button[contains(text(), "ค้นหา")]');

  const item1 = await page.locator('.product-card').first();
  const item1Title = await item1.locator('.product-title').innerText();
  await item1.locator('.add-to-cart-button').click();

  // Step 4: Filter for 32 - 43 inch TVs and add one to the cart
  await page.click('//button[.//span[contains(text(), "ตัวกรอง")]]');
  await page.click('//span[contains(text(), "ช่วงขนาดหน้าจอ (นิ้ว)")]');
  await page.locator('//label[contains(text(), "32 - 43 นิ้ว")]//input').check();
  await page.click('//button[contains(text(), "ค้นหา")]');
  const item2 = await page.locator('.product-card').first();
  const item2Title = await item2.locator('.product-title').innerText();
  await item2.locator('.add-to-cart-button').click();

  // Step 5: Navigate to the cart
  await page.click('a[href*="/cart"]'); // Adjust if there's a specific cart link
  const cartItems = await page.locator('.cart-item .item-title');

  // Step 6: Validate the items in the cart match with the added items
  const cartItemTitles = await cartItems.evaluateAll(items => items.map(item => item.textContent?.trim()));

  // Assertions
  expect(cartItemTitles).toContain(item1Title);
  expect(cartItemTitles).toContain(item2Title);
});