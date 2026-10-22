import { type Locator, type Page } from '@playwright/test';
import { AuthenticatedLayout } from '../../components/AuthenticatedLayout';

export class CartPage {
  readonly layout: AuthenticatedLayout;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(private readonly page: Page) {
    this.layout = new AuthenticatedLayout(page);
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
  }

  async removeProduct(name: string): Promise<void> {
    const item = this.cartItems.filter({ hasText: name });
    await item.getByRole('button', { name: 'Remove' }).click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
    await this.layout.expectLoaded();
  }

  async startCheckout(): Promise<void> {
    await this.checkoutButton.click();
    await this.layout.expectLoaded();
  }
}
