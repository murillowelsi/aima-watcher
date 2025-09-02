import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Bem vindo ao Portal de Renovações!' })).toBeVisible();
});