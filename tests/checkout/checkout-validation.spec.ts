import { expect, test } from '../../fixtures/test-fixtures';
import { CartPage } from '../../pages/cart/CartPage';
import { CheckoutPage } from '../../pages/checkout/CheckoutPage';

test('requires checkout information before continuing', async ({ inventoryPage, page }) => {
  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  await inventoryPage.openCart();

  const cartPage = new CartPage(page);
  await cartPage.startCheckout();

  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.continueButton.click();
  await expect(checkoutPage.errorMessage).toContainText('Error: First Name is required');
  await expect(page).toHaveURL(/checkout-step-one\.html$/);
});

test('cancels checkout and returns to the cart', async ({ inventoryPage, page }) => {
  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  await inventoryPage.openCart();

  const cartPage = new CartPage(page);
  await cartPage.startCheckout();

  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.cancel();

  await expect(page).toHaveURL(/cart\.html$/);
  await expect(cartPage.cartItems).toHaveCount(1);
});
