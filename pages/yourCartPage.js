
class YourCartPage {
    constructor(page, commandPage) {
        this.page = page;
        this.commandPage = commandPage; // Reference to CommandPage
    }

    // Method to click on the basket icon
    async clickOnBasketIcon() {
        await this.page.click(this.commandPage.basketIcon);
    }

    // Method to proceed to the checkout page
    async proceedToCheckout() {
        await this.page.click(this.commandPage.proceedToCheckoutButton);
    }
}

module.exports = YourCartPage;