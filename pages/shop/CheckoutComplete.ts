import { Page, expect } from '@playwright/test';

export class CheckoutCompletePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async assertOrderSuccessful() {
    await expect(this.page.getByText('Checkout: Complete!')).toBeVisible();
    await expect(this.page.getByText('Thank you for your order!')).toBeVisible();
  }
}