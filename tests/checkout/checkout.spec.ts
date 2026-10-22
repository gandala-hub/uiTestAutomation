import { expect, test } from '../../fixtures/test-fixtures';
import { CartPage } from '../../pages/cart/CartPage';
import { CheckoutPage } from '../../pages/checkout/CheckoutPage';

const products = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];

test('completes an order with three products', async ({ page, inventoryPage }) => {
  for (const product of products) {
    await inventoryPage.addProductToCart(product);
  }

  await expect(inventoryPage.layout.header.cartButton).toContainText('3');
  await inventoryPage.openCart();
  const cartPage = new CartPage(page);

  for (const product of products) {
    await expect(cartPage.cartItems.getByText(product, { exact: true })).toBeVisible();
  }

  const checkoutPage = new CheckoutPage(page);
  await cartPage.startCheckout();
  await checkoutPage.enterShippingDetails('Test', 'Customer', '12345');

  for (const product of products) {
    await expect(page.getByText(product, { exact: true })).toBeVisible();
  }

  await expect(checkoutPage.itemTotal).toHaveText('Item total: $55.97');
  await expect(checkoutPage.taxTotal).toHaveText('Tax: $4.48');
  await expect(checkoutPage.orderTotal).toHaveText('Total: $60.45');

  await checkoutPage.finishOrder();

  await expect(checkoutPage.confirmationHeading).toBeVisible();
  await expect(page.getByText('Your order has been dispatched, and will arrive just as fast as the pony can get there!', { exact: true })).toBeVisible();
});
