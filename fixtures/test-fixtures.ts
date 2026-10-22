import { test as base } from '@playwright/test';
import { InventoryPage } from '../pages/inventory/InventoryPage';
import { LoginPage } from '../pages/login/LoginPage';
import testData from '../test-data/testdata.json';

type TestFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
};

export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(testData.users.standard.username, testData.users.standard.password);
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.layout.expectLoaded();
    await use(inventoryPage);
  },
});

export { expect } from '@playwright/test';
