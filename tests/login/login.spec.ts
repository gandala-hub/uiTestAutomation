import { expect, test } from '../../fixtures/test-fixtures';
import testData from '../../test-data/testdata.json';

test('logs in as the standard user', async ({ page, loginPage }) => {
  await loginPage.open();
  await loginPage.login(testData.users.standard.username, testData.users.standard.password);

  await loginPage.layout.expectLoaded();
  await expect(page).toHaveURL(/inventory\.html$/);
  await expect(page.getByText('Products', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Add to cart' })).toHaveCount(6);
});
