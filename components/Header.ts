import { type Locator, type Page } from '@playwright/test';

export class Header {
  readonly banner: Locator;
  readonly logo: Locator;
  readonly cartButton: Locator;
  readonly menuButton: Locator;

  constructor(page: Page) {
    this.banner = page.getByRole('banner');
    this.logo = page.getByText('Swag Labs', { exact: true });
    this.cartButton = page.getByRole('button', { name: /Cart/ });
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
  }
}
