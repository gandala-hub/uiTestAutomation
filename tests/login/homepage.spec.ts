import { expect, test } from '../../fixtures/test-fixtures';

test('opens the SauceDemo login page', async ({ page, loginPage }) => {
  await loginPage.open();

  await expect(page).toHaveTitle('Swag Labs');
  await expect(loginPage.usernameInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.loginButton).toBeVisible();
});
