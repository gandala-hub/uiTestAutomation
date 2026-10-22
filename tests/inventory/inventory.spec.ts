import { expect, test } from '../../fixtures/test-fixtures';
import { ProductDetailsPage } from '../../pages/inventory/ProductDetailsPage';

test('sorts products by name in ascending and descending order', async ({ inventoryPage }) => {
  const ascendingNames = [
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
    'Sauce Labs Bolt T-Shirt',
    'Sauce Labs Fleece Jacket',
    'Sauce Labs Onesie',
    'Test.allTheThings() T-Shirt (Red)',
  ];

  await inventoryPage.sortSelect.selectOption({ label: 'Name (A to Z)' });
  await expect.poll(() => inventoryPage.getProductNames()).toEqual(ascendingNames);

  await inventoryPage.sortSelect.selectOption({ label: 'Name (Z to A)' });
  await expect.poll(() => inventoryPage.getProductNames()).toEqual([...ascendingNames].reverse());
});

test('sorts products by price from low to high and high to low', async ({ inventoryPage }) => {
  const ascendingPrices = [7.99, 9.99, 15.99, 15.99, 29.99, 49.99];

  await inventoryPage.sortSelect.selectOption({ label: 'Price (low to high)' });
  await expect.poll(() => inventoryPage.getProductPrices()).toEqual(ascendingPrices);

  await inventoryPage.sortSelect.selectOption({ label: 'Price (high to low)' });
  await expect.poll(() => inventoryPage.getProductPrices()).toEqual([...ascendingPrices].reverse());
});

test('opens product details and returns to the inventory', async ({ inventoryPage, page }) => {
  await inventoryPage.openProduct('Sauce Labs Backpack');

  const detailsPage = new ProductDetailsPage(page);
  await expect(detailsPage.productName('Sauce Labs Backpack')).toBeVisible();
  await expect(detailsPage.description).toContainText('sleek, streamlined Sly Pack');
  await expect(detailsPage.price).toHaveText('$29.99');

  await detailsPage.backToProducts();
  await expect(inventoryPage.productsHeading).toBeVisible();
});
