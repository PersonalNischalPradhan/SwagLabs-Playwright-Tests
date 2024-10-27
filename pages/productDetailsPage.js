class ProductDetailsPage {
    constructor(page, commandPage) {
        this.page = page;
        this.commandPage = commandPage; // Reference to CommandPage
    }

    // Method to select a product by index
    async selectProduct(index) {
        const products = await this.page.$$(this.commandPage.productItem);  // Get all products
        if (products.length > index) {
            await products[index].click();
        } else {
            throw new Error(`Product with index ${index} not found`);
        }
    }


    // Method to add the product to the cart
    async addToCart() {
        await this.page.click(this.commandPage.addToCartButton);
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

module.exports = ProductDetailsPage;
