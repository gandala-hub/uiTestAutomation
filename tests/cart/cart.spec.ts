import { expect, test } from '../../fixtures/test-fixtures';
import { CartPage } from '../../pages/cart/CartPage';

test('adds a product to the cart and removes it', async ({ inventoryPage, page }) => {
  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  await expect(inventoryPage.layout.header.cartButton).toContainText('1');
  await inventoryPage.openCart();

  const cartPage = new CartPage(page);
  await expect(cartPage.cartItems).toHaveCount(1);
  await expect(cartPage.cartItems.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();

  await cartPage.removeProduct('Sauce Labs Backpack');
  await expect(cartPage.cartItems).toHaveCount(0);
  await expect(cartPage.layout.header.cartButton).toHaveAccessibleName('Cart, empty');
});
