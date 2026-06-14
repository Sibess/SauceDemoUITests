import { test } from '@playwright/test';
import { LoginPage } from '../../pages/authentication/Login';
import { InventoryPage } from '../../pages/shop/Inventory';
import { CartPage } from '../../pages/shop/Cart';
import { CheckoutStepOnePage } from '../../pages/shop/CheckoutStepOne';
import { CheckoutStepTwoPage } from '../../pages/shop/CheckoutStepTwo';
import { CheckoutCompletePage } from '../../pages/shop/CheckoutComplete';

test.describe('Shop module Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutStepOnePage: CheckoutStepOnePage;
  let checkoutStepTwoPage: CheckoutStepTwoPage;
  let checkoutCompletePage: CheckoutCompletePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutStepOnePage = new CheckoutStepOnePage(page);
    checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    checkoutCompletePage = new CheckoutCompletePage(page);

    await loginPage.goToBaseURL();
    await loginPage.login(process.env.SAUCEDEMO_USERNAME!, process.env.SAUCEDEMO_PASSWORD!);
  });

  test('should buy first item', async ({ page }) => {
    await inventoryPage.assertLoggedIn();
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.openCart();
    await cartPage.goToCheckout();
    await checkoutStepOnePage.fillCustomerInfo('test', 'test', '123');
    await checkoutStepOnePage.continueCheckout();
    await checkoutStepTwoPage.finishOrder();
    await checkoutCompletePage.assertOrderSuccessful();
  });
});