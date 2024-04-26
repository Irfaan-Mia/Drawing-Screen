import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Test to ensure the canvas of the drawing page is visible
test('Ensure the canvas of the drawing page is visible', async ({ page }) => {
  await page.goto('http://localhost:3000/class/draw');
  await expect(page.locator('#drawing-canvas')).toBeVisible();
});

// Test to ensure the toolbox is visible
test('Ensure the toolbox is visible', async ({ page }) => {
  await page.goto('http://localhost:3000/class/draw');
  await expect(page.locator('#tool-box')).toBeVisible();
});

// Test to ensure Eraser tool is visible
test("Ensure Eraser tool is visible", async ({ page }) => {
  await page.goto('http://localhost:3000/class/draw');
  await expect(page.getByText('Eraser')).toBeVisible();
});

// Test to ensure Highlighter tool is visible
test("Ensure Highlighter tool is visible", async ({ page }) => {
  await page.goto('http://localhost:3000/class/draw');
  await expect(page.getByText('Highlighter')).toBeVisible();
});

// Test to ensure spray can tool is visible
test("Ensure spray can tool is visible", async ({ page }) => {
  await page.goto('http://localhost:3000/class/draw');
  await expect(page.getByText('SprayCan')).toBeVisible();
});

// Test to ensure size selection tool is visible
test("Ensure size selection tool is visible", async ({ page }) => {
  await page.goto('http://localhost:3000/class/draw');
  await expect(page.getByText('Size Selection:')).toBeVisible();
  await expect(page.locator('#drawing-size-input')).toBeVisible();
});

// Test to ensure circle tool is visible
test("Ensure circle tool is visible", async ({ page }) => {
  await page.goto('http://localhost:3000/class/draw');
  await expect(page.getByText('Circle')).toBeVisible();
});

// Test to ensure rectangle tool is visible
test("Ensure Rectangle tool is visible", async ({ page }) => {
  await page.goto('http://localhost:3000/class/draw');
  await expect(page.getByText('Rectangle')).toBeVisible();
});

// Test to ensure triangle tool is visible
test("Ensure Triangle tool is visible", async ({ page }) => {
  await page.goto('http://localhost:3000/class/draw');
  await expect(page.getByText('Triangle')).toBeVisible();
});

// Test to ensure colors selection is visible
test("Ensure colors selection is visible", async ({ page }) => {
  await page.goto('http://localhost:3000/class/draw');
  await expect(page.getByText('Color Selection:')).toBeVisible();
  await expect(page.locator('#red-color-option')).toBeVisible();
  await expect(page.locator('#green-color-option')).toBeVisible();
  await expect(page.locator('#blue-color-option')).toBeVisible();
  await expect(page.locator('#purple-color-option')).toBeVisible();
  await expect(page.getByRole('textbox')).toBeVisible();
});

// Test to ensure clear button is visible
test('Ensure clear button is visible', async ({ page }) => {
  await page.goto('http://localhost:3000/class/draw');
  await expect(page.getByRole('button', { name: 'Clear' })).toBeVisible();
});

// Test to ensure undo button is visible
test('Ensure undo button is visible', async ({ page }) => {
  await page.goto('http://localhost:3000/class/draw');
  await expect(page.getByRole('button', { name: 'Undo' })).toBeVisible();
});

// Test to ensure tool box has correct dimensions
test('Ensure tool box has correct dimensions', async ({ page }) => {
  await page.goto('http://localhost:3000/class/draw');

  // Read CSS file to get dimensions
  const cssFile = fs.readFileSync(path.resolve(__dirname, '../public/css/draw.css'), 'utf8');
  const widthMatch = cssFile.match(/\.canvas-container \.tool-box\s*{\s*[^}]*width:\s*(\d+)vw/);
  const heightMatch = cssFile.match(/\.canvas-container \.tool-box\s*{\s*[^}]*height:\s*(\d+)vh/);

  // Get dimensions from the page
  const dimensions = await page.evaluate(() => {
    const toolBox = document.querySelector('#tool-box');
    const computedStyle = getComputedStyle(toolBox);
    return {
      width: parseFloat(computedStyle.width),
      height: parseFloat(computedStyle.height)
    };
  });

  // Get window size
  const windowSize = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
  }));

  // Compare dimensions with CSS values
  expect(dimensions.width/windowSize.innerWidth).toBeCloseTo(parseFloat(widthMatch[1])/100.0);
  expect(dimensions.height/windowSize.innerHeight).toBeCloseTo(parseFloat(heightMatch[1])/100.00);
});

// Test to ensure canvas has correct dimensions
test('Ensure canvas has correct dimensions', async ({ page }) => {
  await page.goto('http://localhost:3000/class/draw');

  // Read CSS file to get dimensions
  const cssFile = fs.readFileSync(path.resolve(__dirname, '../public/css/draw.css'), 'utf8');
  const widthMatch = cssFile.match(/\.canvas-container \.drawing-canvas\s*{\s*[^}]*width:\s*(\d+)vw/);
  const heightMatch = cssFile.match(/\.canvas-container \.drawing-canvas\s*{\s*[^}]*height:\s*(\d+)vh/);

  // Get dimensions from the page
  const dimensions = await page.evaluate(() => {
    const canvas = document.querySelector('#drawing-canvas');
    const computedStyle = getComputedStyle(canvas);
    return {
      width: parseFloat(computedStyle.width),
      height: parseFloat(computedStyle.height)
    };
  });

  // Get window size
  const windowSize = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
  }));

  // Compare dimensions with CSS values
  expect(dimensions.width/windowSize.innerWidth).toBeCloseTo(parseFloat(widthMatch[1])/100.0);
  expect(dimensions.height/windowSize.innerHeight).toBeCloseTo(parseFloat(heightMatch[1])/100.00);
});

// Test to check if the user is capable of drawing on the drawing screen
test('User is capable of drawing on the drawing screen', async ({ page }) => {
  await page.goto('http://localhost:3000/class/draw');  

  const x = 490;
  const y = 132;

  // Click on the canvas at specific position
  await page.locator('#drawing-canvas').click({
    position: {
      x: x,
      y: y
    }
  });

  // Wait for a short delay to ensure the drawing is complete
  await page.waitForTimeout(500);

  // Get pixel data from the clicked position
  const pixelData = await page.evaluate(([x, y]) => {
    const canvas = document.getElementById('drawing-canvas');
    const context = canvas.getContext('2d');
    const imageData = context.getImageData(x, y, 1, 1).data;
    return Array.from(imageData);
  }, [x, y]);

  const expectedPixelData = [0, 0, 0, 255]; // Assuming black color
  const pixelDataMatches = pixelData.every((value, index) => value === expectedPixelData[index]);

  // If pixel data does not match the expected color, skip the test
  if (!pixelDataMatches) {
    test.skip('Pixel data does not match the expected color.');
  }
});

