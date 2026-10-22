import { type Locator, type Page } from '@playwright/test';
import { AuthenticatedLayout } from '../../components/AuthenticatedLayout';

export class ProductDetailsPage {
  readonly layout: AuthenticatedLayout;
  readonly backToProductsButton: Locator;
  readonly description: Locator;
  readonly price: Locator;

  constructor(private readonly page: Page) {
    this.layout = new AuthenticatedLayout(page);
    this.backToProductsButton = page.getByRole('button', { name: 'Back to products' });
    this.description = page.locator('.inventory_details_desc');
    this.price = page.locator('.inventory_details_price');
  }

  productName(name: string): Locator {
    return this.page.getByText(name, { exact: true });
  }

  productPrice(price: string): Locator {
    return this.price.getByText(price, { exact: true });
  }

  async backToProducts(): Promise<void> {
    await this.backToProductsButton.click();
    await this.layout.expectLoaded();
  }
}
