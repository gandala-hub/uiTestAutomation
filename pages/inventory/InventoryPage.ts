import { type Locator, type Page } from '@playwright/test';
import { AuthenticatedLayout } from '../../components/AuthenticatedLayout';

export class InventoryPage {
  readonly layout: AuthenticatedLayout;
  readonly productsHeading: Locator;
  readonly productCards: Locator;
  readonly sortSelect: Locator;

  constructor(private readonly page: Page) {
    this.layout = new AuthenticatedLayout(page);
    this.productsHeading = page.getByText('Products', { exact: true });
    this.productCards = page.locator('.inventory_item');
    this.sortSelect = page.getByRole('combobox', { name: 'Sort products' });
  }

  async addProductToCart(name: string): Promise<void> {
    const product = this.productCards.filter({ hasText: name });
    await product.getByRole('button', { name: 'Add to cart' }).click();
  }

  async openProduct(name: string): Promise<void> {
    const product = this.productCards.filter({ hasText: name });
    await product.getByRole('button', { name: `View details for ${name}` }).first().click();
    await this.layout.expectLoaded();
  }

  async getProductNames(): Promise<string[]> {
    return this.productCards.locator('.inventory_item_name').allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const priceTexts = await this.productCards.locator('.inventory_item_price').allTextContents();
    return priceTexts.map((price) => Number(price.replace('$', '')));
  }

  async openCart(): Promise<void> {
    await this.layout.header.cartButton.click();
    await this.layout.expectLoaded();
  }

  async openMenu(): Promise<void> {
    await this.layout.header.menuButton.click();
  }

  async resetAppState(): Promise<void> {
    await this.openMenu();
    await this.page.getByRole('button', { name: 'Reset App State' }).click();
  }

  async logout(): Promise<void> {
    await this.openMenu();
    await this.page.getByRole('button', { name: 'Logout' }).click();
  }
}
