
class YourCartPage {
    constructor(page, commandPage) {
        this.page = page;
        this.commandPage = commandPage;
    }

    // Method to click on the basket icon
    async clickOnBasketIcon() {
        await this.page.click(this.commandPage.basketIcon);
    }

    // Method to proceed to the checkout page
    async proceedToCheckout() {
        await this.page.click(this.commandPage.proceedToCheckoutButton);
    }
    //Method to get price from your cart page
    async getPriceFromYourCartPage() {
        const productPriceOnYourCartPage = await this.page.locator('.inventory_item_price').textContent();
        return productPriceOnYourCartPage.replace('$', '');
    }

}

module.exports = YourCartPage;