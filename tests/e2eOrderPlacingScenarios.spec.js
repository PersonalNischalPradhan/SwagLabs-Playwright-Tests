const { test, expect } = require('@playwright/test');
const loginData = require('../properties/loginProperties');
const checkoutData = require('../properties/checkoutProperties');
const CommandPage = require('../pages/CommandPage');
const checkoutOverviewPage = loginData.urls.swaglabsUrl + '/checkout-step-two.html';

test.describe('E2E order flow with various users ', () => {
    let commandPage;
    test.beforeEach(async ({ page }) => {
        commandPage = new CommandPage(page);
        await page.goto(loginData.urls.swaglabsUrl);
    });

    /*Verify that the standard user is able to place order by adding product from the product details page.
    * Verify order confirmation message.
    */
    test('standard user should complete an order successfully', async ({ page }) => {
        await commandPage.loginPage.login(loginData.account.usernames[0], loginData.account.password);
        await commandPage.homePage.navigateToProductLister();
        await commandPage.productDetailsPage.addToCart();
        await commandPage.productDetailsPage.clickOnBasketIcon();
        await commandPage.productDetailsPage.proceedToCheckout();
        await commandPage.checkoutPage.checkout();
        await commandPage.CheckoutOverviewPage.checkoutOverviewBtnClick();
        const confirmationText = await commandPage.OrderConfirmationPage.getOrderConfirmationText();
        console.log('Confirmation Text : ' + confirmationText);
        expect(confirmationText).toContain(checkoutData.orderConfirmationMessage.confirmation);
    });

    /*Verify that the standard user is able to place order by adding all the products from the product lister page.
   * Verify order confirmation message.
   */
    test('standard user should add all products to cart and place order successfully', async ({ page }) => {
        await commandPage.loginPage.login(loginData.account.usernames[0], loginData.account.password);
        await commandPage.productDetailsPage.addAllProductsToCart(); 
        const cartItemCount = await commandPage.homePage.getCartItemCount();
        expect(parseInt(cartItemCount)).toBe(6); // Verify that all 6 products are added
        await commandPage.productDetailsPage.clickOnBasketIcon();
        await commandPage.productDetailsPage.proceedToCheckout();
        await commandPage.checkoutPage.checkout();
        await commandPage.CheckoutOverviewPage.checkoutOverviewBtnClick();
        const confirmationText = await commandPage.OrderConfirmationPage.getOrderConfirmationText();
        console.log('Confirmation Text : ' + confirmationText);
        expect(confirmationText).toContain(checkoutData.orderConfirmationMessage.confirmation);
    });


    /*Verify that the performance glitch User is able to place order by adding all the products from the product lister page.
   * Verify order confirmation message.
   */
    test('performance glitch user should add all products to cart and place order successfully', async ({ page }) => {
        await commandPage.loginPage.login(loginData.account.usernames[3], loginData.account.password);
        await commandPage.productDetailsPage.addAllProductsToCart();
        const cartItemCount = await commandPage.homePage.getCartItemCount();
        expect(parseInt(cartItemCount)).toBe(6); // Verify that all 6 products are added
        await commandPage.productDetailsPage.clickOnBasketIcon();
        await commandPage.productDetailsPage.proceedToCheckout();
        await commandPage.checkoutPage.checkout();
        await commandPage.CheckoutOverviewPage.checkoutOverviewBtnClick();
        const confirmationText = await commandPage.OrderConfirmationPage.getOrderConfirmationText();
        console.log('Confirmation Text : ' + confirmationText);
        expect(confirmationText).toContain(checkoutData.orderConfirmationMessage.confirmation);
    });

    /*Verify that the problem user is able to place order by adding all the products from the product lister page.
    * Verify order confirmation message.
    */
    test('problem user should add all products to cart and place order successfully', async ({ page }) => {
        await commandPage.loginPage.login(loginData.account.usernames[1], loginData.account.password);
        await commandPage.productDetailsPage.addAllProductsToCart(); 
        const cartItemCount = await commandPage.homePage.getCartItemCount();
        expect(parseInt(cartItemCount)).toBe(6); // Verify that all 6 products are added
        await commandPage.productDetailsPage.clickOnBasketIcon();
        await commandPage.productDetailsPage.proceedToCheckout();
        await commandPage.checkoutPage.checkout();
        await commandPage.CheckoutOverviewPage.checkoutOverviewBtnClick();
        const confirmationText = await commandPage.OrderConfirmationPage.getOrderConfirmationText();
        console.log('Confirmation Text : ' + confirmationText);
        expect(confirmationText).toContain(checkoutData.orderConfirmationMessage.confirmation);
    });

    /*Verify that the order should not be placed without filling the checkout details 
    * Verify user is not able to navigate beyond 'Checkout: Overview' page
    */
    test('Verify that the order should not be placed without filling the checkout details', async ({ page }) => {
        await commandPage.loginPage.login(loginData.account.usernames[0], loginData.account.password);
        await commandPage.homePage.navigateToProductLister();
        await commandPage.productDetailsPage.clickOnBasketIcon();
        await commandPage.productDetailsPage.proceedToCheckout();
        await commandPage.checkoutPage.checkoutWithoutInfoDetails();
        await expect.soft(page, "User is able to navigate to 'Checkout: Overview' page").not.toHaveURL(checkoutOverviewPage);
    });

});
