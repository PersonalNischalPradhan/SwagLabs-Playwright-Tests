const { test, expect } = require('@playwright/test');
const loginData = require('../properties/loginProperties');
const checkoutData = require('../properties/checkoutProperties');
const CommandPage = require('../pages/CommandPage');
const checkoutOverviewPage = loginData.urls.swaglabsUrl + '/checkout-step-two.html';

test.describe('Product Sorting Comparison', () => {
    let commandPage;
    test.beforeEach(async ({ page }) => {
        commandPage = new CommandPage(page);
        await page.goto(loginData.urls.swaglabsUrl);
        await commandPage.loginPage.login(loginData.account.usernames[0], loginData.account.password);
    });

    /*
   * Compare item lists sorted by name (A to Z vs. Z to A)
   */
    test('Compare item lists sorted by name (A to Z vs. Z to A)', async ({ page }) => {
        // Sort items A to Z
        await commandPage.homePage.selectSortingOption('az');
        const aToZList = await commandPage.homePage.getInventoryItemNames();
        console.log(aToZList);
        // Sort items Z to A
        await commandPage.homePage.selectSortingOption('za');
        const zToAList = await commandPage.homePage.getInventoryItemNames();
        console.log(zToAList);
        // Reverse the A to Z list and compare with Z to A list
        expect(aToZList.reverse()).toEqual(zToAList);
    });

    /*
   * Compare item lists sorted by price (Low to High vs. High to Low)
   */
    test('Compare item lists sorted by price (Low to High vs. High to Low)', async ({ page }) => {
        // Sort items by price Low to High
        await commandPage.homePage.selectSortingOption('lohi');
        const lowToHighPrices = await commandPage.homePage.getInventoryItemPrice();
        console.log(lowToHighPrices);
        // Sort items by price High to Low
        await commandPage.homePage.selectSortingOption('hilo');
        const highToLowPrices = await commandPage.homePage.getInventoryItemPrice();
        console.log(highToLowPrices);
        // Reverse the High to Low list and compare with Low to High list
        expect(lowToHighPrices.reverse()).toEqual(highToLowPrices);
    });
});