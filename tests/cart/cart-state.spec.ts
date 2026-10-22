import { expect, test } from '../../fixtures/test-fixtures';
import { CartPage } from '../../pages/cart/CartPage';

test('resetting app state clears the cart', async ({ inventoryPage, page }) => {
  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  await expect(inventoryPage.layout.header.cartButton).toContainText('1');

  await inventoryPage.resetAppState();

  await expect(inventoryPage.layout.header.cartButton).toHaveAccessibleName('Cart, empty');
  await page.getByRole('button', { name: 'All Items' }).click();
  await inventoryPage.openCart();

  const cartPage = new CartPage(page);
  await expect(cartPage.cartItems).toHaveCount(0);
});
