import { test, expect } from '@playwright/test';


test('Ensure the title of the drawing page is visible', async ({ page }) => {
  await page.goto('http://localhost:3000/class/draw');
  await expect(page.getByRole('heading', { name: 'Miscommunication Mayhem' })).toBeVisible();
});

test('Ensure the canvas of the drawing page is visible', async ({ page }) => {
  await page.goto('http://localhost:3000/class/draw');
  await expect(page.locator('#drawing-canvas')).toBeVisible();
});
test('canvas has correct dimensions', async ({ page }) => {
  await page.goto('http://localhost:3000/draw')

  const canvas = await page.$('canvas')
  const width = await canvas.getAttribute('width')
  const height = await canvas.getAttribute('height')

  const windowSize = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
  }))

  expect(width).toBe(`${windowSize.innerWidth - 300}`)
  expect(height).toBe(`${windowSize.innerHeight - 300}`)
})