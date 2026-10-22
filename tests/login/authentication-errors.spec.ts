import { expect, test } from '../../fixtures/test-fixtures';
import testData from '../../test-data/testdata.json';

test('shows an error for invalid credentials', async ({ loginPage }) => {
  await loginPage.open();
  await loginPage.login('invalid_user', 'invalid_password');

  await expect(loginPage.errorMessage).toContainText(
    'Username and password do not match any user in this service',
  );
});

test('shows an error when a locked-out user tries to log in', async ({ loginPage }) => {
  await loginPage.open();
  await loginPage.login(testData.users.lockedOut.username, testData.users.lockedOut.password);

  await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out.');
});
