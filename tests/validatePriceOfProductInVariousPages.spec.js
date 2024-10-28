const { test, expect } = require('@playwright/test');
const loginData = require('../properties/loginProperties');
const checkoutData = require('../properties/checkoutProperties');
const CommandPage = require('../pages/CommandPage');
const inventoryData = require('../properties/inventoryProperties');


test.describe('Verify Product Price Consistency across all Pages ', () => {
  let commandPage;
  test.beforeEach(async ({ page }) => {
    commandPage = new CommandPage(page);
    await page.goto(loginData.urls.swaglabsUrl);
  });

  /*Verify and ompare product price across listing, details, cart, checkout overview pages
    * Verify the order confirmation message at the end
    */
  test('Compare product price across listing, details, cart, checkout overview pages', async ({ page }) => {
    await commandPage.loginPage.login(loginData.account.usernames[0], loginData.account.password);
    // Navigate to product lsiter page and verify price
    const listerPrice = await commandPage.homePage.getProductPriceFromListerPage(inventoryData.itemNames.backpackName);
    console.log(`Listing price: ${listerPrice}`);

    // Navigate to product details page and verify price
    const pdpPrice = await commandPage.productDetailsPage.getProductPriceFromDetailsPage(inventoryData.itemNames.backpackName);
    console.log(`Product details price is : ${pdpPrice}`);
    expect(listerPrice).toBe(pdpPrice);

    // Add product to basket and navigate to Your Cart Page
    await commandPage.productDetailsPage.addToCart();
    await commandPage.productDetailsPage.clickOnBasketIcon();
    const productPriceOnCheckout = await commandPage.yourCartPage.getPriceFromYourCartPage();
    console.log(`Product checout price is : ${productPriceOnCheckout}`);
    expect(listerPrice).toBe(productPriceOnCheckout);

    // Proceed to Checkout Overview Page and verify price
    await commandPage.yourCartPage.proceedToCheckout();
    await commandPage.checkoutPage.checkout();
    const productPriceOnCheckoutOverview = await commandPage.checkoutOverviewPage.getProductPriceFromCheckoutOverview()
    expect(listerPrice).toBe(productPriceOnCheckoutOverview);

    // Complete purchase and verify text on Confirmation Page
    await commandPage.checkoutOverviewPage.checkoutOverviewBtnClick();
    const confirmationText = await commandPage.orderConfirmationPage.getOrderConfirmationText();
    console.log('Confirmation Text : ' + confirmationText);
    expect(confirmationText).toContain(checkoutData.orderConfirmationMessage.confirmation);
    console.log("Price validated successfully across all pages including order confirmation.");
  });

});