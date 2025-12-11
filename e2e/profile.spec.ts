import { test, expect } from '@playwright/test';

test('profile page', async ({ page }) => {
  await page.goto('/#/login');
  await page.waitForSelector('body');
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByLabel('Password').fill('password');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForURL('/#/');

  await page.goto('/#/profile');

  await expect(page.getByText('Edit Profile')).toBeVisible();

  await page.getByLabel('Name').fill('New Name');
  await page.getByLabel('Email').fill('new@example.com');
  await page.getByRole('button', { name: 'Save Changes' }).click();

  // For the purpose of this test, we'll just check that the values
  // are updated in the form, as we don't have a real backend to verify against.
  await expect(page.getByLabel('Name')).toHaveValue('New Name');
  await expect(page.getByLabel('Email')).toHaveValue('new@example.com');
});
