const { test, expect } = require('@playwright/test');
const loginData = require('../properties/loginProperties');
const checkoutData = require('../properties/checkoutProperties');
const CommandPage = require('../pages/CommandPage');
const checkoutOverviewPage = loginData.urls.swaglabsUrl + '/checkout-step-two.html';

test.describe('Verify Product Price Consistency Across Listing, Details, Cart, Checkout, and Order Confirmation Pages ', () => {
    let commandPage;
    test.beforeEach(async ({ page }) => {
        commandPage = new CommandPage(page);
        await page.goto(loginData.urls.swaglabsUrl);
        await commandPage.loginPage.login(loginData.account.usernames[0], loginData.account.password);
    });

test('Compare product price across listing, details, cart, checkout overview pages', async ({ page }) => {

  // Step 1: get price from Sauce Labs Backpack
const listerPrice = await page
    .locator('.inventory_item')
    .filter({ has: page.locator('.inventory_item_name', { hasText: 'Sauce Labs Backpack' }) })
    .locator('.inventory_item_price')
    .textContent();
    const cleanListerPprice=listerPrice.replace('$', '');
console.log(`Sauce Labs Backpack Lister price: ${cleanListerPprice}`); 


console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww");

  // Step 2: click the item
await page
    .locator('.inventory_item')
    .filter({ has: page.locator('.inventory_item_name', { hasText: 'Sauce Labs Backpack' }) })
    .locator('.inventory_item_name')
    .click(); 

  // Step 3: Navigate to the Product Details Page and extract the price
const productName = await page.locator('.inventory_details_name').textContent();
const productDetailsPrice = await page.locator('.inventory_details_price').textContent();
const cleanPDPprice=productDetailsPrice.replace('$', '');

console.log(`Product: ${productName}`); 
console.log(`Product details price is : ${cleanPDPprice}`);  
expect(cleanListerPprice).toBe(cleanPDPprice);

  // Step 4: Add product to cart and navigate to Cart Page
  await commandPage.productDetailsPage.addToCart();
  await commandPage.productDetailsPage.clickOnBasketIcon();
  const productPriceOnCheckout = await page.locator('.inventory_item_price').textContent();
  console.log(`Product checout price is : ${productPriceOnCheckout}`);   // Should print "$29.99"
  expect(cleanPDPprice).toBe(productPriceOnCheckout);
  await commandPage.yourCartPage.proceedToCheckout();

  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  // Step 5: Proceed to Checkout Overview Page and verify price
  await commandPage.checkoutPage.checkout();
  const productPriceOnCheckoutOverview = await page.locator('.inventory_item_price').textContent();
  const cleanCheckoutOverviewPP=productPriceOnCheckoutOverview.replace('$', '');
  expect(cleanPDPprice).toBe(cleanCheckoutOverviewPP);
  console.log("11111111111111111111111111111111111111111111111111111");

  // Step 6: Complete purchase and verify on Confirmation Page
  await commandPage.checkoutOverviewPage.checkoutOverviewBtnClick();
  const confirmationText = await commandPage.orderConfirmationPage.getOrderConfirmationText();
  console.log('Confirmation Text : ' + confirmationText);
  expect(confirmationText).toContain(checkoutData.orderConfirmationMessage.confirmation);
  console.log("Price verification successful across all pages including order confirmation.");
});
});
