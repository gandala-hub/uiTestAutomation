import { expect, test } from '../../fixtures/test-fixtures';

test('logs out and protects the inventory page', async ({ inventoryPage, loginPage, page }) => {
  await inventoryPage.logout();
  await expect(page).toHaveURL('/');
  await expect(loginPage.loginButton).toBeVisible();

  await page.goto('/inventory.html');

  await expect(page).toHaveURL('/');
  await expect(loginPage.usernameInput).toBeVisible();
});
