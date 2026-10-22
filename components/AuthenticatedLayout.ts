import { expect, type Page } from '@playwright/test';
import { Footer } from './Footer';
import { Header } from './Header';

export class AuthenticatedLayout {
  readonly header: Header;
  readonly footer: Footer;

  constructor(page: Page) {
    this.header = new Header(page);
    this.footer = new Footer(page);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.header.banner).toBeVisible();
    await expect(this.header.logo).toBeVisible();
    await expect(this.header.cartButton).toBeVisible();
    await expect(this.footer.container).toBeVisible();
    await expect(this.footer.socialLinks).toHaveCount(3);
  }
}
