import { type Locator, type Page } from '@playwright/test';

export class Footer {
  readonly container: Locator;
  readonly socialLinks: Locator;

  constructor(page: Page) {
    this.container = page.getByRole('contentinfo');
    this.socialLinks = this.container.getByRole('link');
  }
}
