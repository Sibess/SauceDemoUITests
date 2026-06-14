import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryItems: Locator;
    readonly cartIcon: Locator;


  constructor(page: Page) {
    this.page = page;
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
       this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
  }

  async assertLoggedIn() {
    await expect(this.page).toHaveURL(/\/inventory.html$/);
    await expect(this.inventoryItems.first()).toBeVisible();
  }

  //    async addItemToCartByName(name: string) {
  //   const item = this.inventoryItems.filter({ hasText: name });
  //   await expect(item).toBeVisible();

  //   const addToCartButton = item.getByRole('button', { name: 'Add to cart' });
  //   await expect(addToCartButton).toBeVisible();
  //   await addToCartButton.click();

  // } 

  async addFirstItemToCart() {
  const firstItem = this.inventoryItems.first();
  await expect(firstItem).toBeVisible();

  const addToCartButton = firstItem.getByRole('button', { name: 'Add to cart' });
  await expect(addToCartButton).toBeVisible();
  await addToCartButton.click();
}

  async openCart() {
    await expect(this.cartIcon).toBeVisible();
    await this.cartIcon.click();
  }
}
