import { test } from '@playwright/test';
import { LoginPage } from '../../pages/authentication/login';
import { InventoryPage } from '../../pages/inventory/Inventory';

test.describe('Login page Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goToBaseURL();
    await loginPage.login(process.env.SAUCEDEMO_USERNAME!, process.env.SAUCEDEMO_PASSWORD!);
  });

  test('should add item to cart', async ({ page }) => {
    await inventoryPage.assertLoggedIn();
    await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
    await inventoryPage.openCart();
  });
});