// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:5001/')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/React App/);
});

test('get started link', async ({ page }) => {
  await page.goto('http://localhost:5001/', { timeout: 60000 })

  // Click the get started link.
  await expect(page.getByRole('button', { name: 'Add Chat' })).toBeVisible();
  await page.getByRole('button', { name: 'Add Chat' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
