import { type Locator, type Page } from '@playwright/test';
import { AuthenticatedLayout } from '../../components/AuthenticatedLayout';

export class CheckoutPage {
  readonly layout: AuthenticatedLayout;
  readonly checkoutButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly finishButton: Locator;
  readonly confirmationHeading: Locator;
  readonly errorMessage: Locator;
  readonly itemTotal: Locator;
  readonly taxTotal: Locator;
  readonly orderTotal: Locator;

  constructor(private readonly page: Page) {
    this.layout = new AuthenticatedLayout(page);
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.confirmationHeading = page.getByText('Thank you for your order!', { exact: true });
    this.errorMessage = page.getByRole('alert');
    this.itemTotal = page.locator('.summary_subtotal_label');
    this.taxTotal = page.locator('.summary_tax_label');
    this.orderTotal = page.locator('.summary_total_label');
  }

  async startCheckout(): Promise<void> {
    await this.checkoutButton.click();
    await this.layout.expectLoaded();
  }

  async enterShippingDetails(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
    await this.layout.expectLoaded();
  }

  async finishOrder(): Promise<void> {
    await this.finishButton.click();
    await this.layout.expectLoaded();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
    await this.layout.expectLoaded();
  }
}
