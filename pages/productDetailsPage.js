class ProductDetailsPage {
    constructor(page, commandPage) {
        this.page = page;
        this.commandPage = commandPage;
    }

    // Method to select a product by index
    async selectProduct(index) {
        const products = await this.page.$$(this.commandPage.productItem);
        if (products.length > index) {
            await products[index].click();
        } else {
            throw new Error(`Product with index ${index} not found`);
        }
    }


    // Method to add the product to the cart from product details page
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
    // Method to navigate to product details page and get the price
    async getProductPriceFromDetailsPage(productName) {
        await this.page
            .locator('.inventory_item')
            .filter({ has: this.page.locator('.inventory_item_name', { hasText: productName }) })
            .locator('.inventory_item_name')
            .click();

        const productDetailsPrice = await this.page.locator('.inventory_details_price').textContent();
        return productDetailsPrice.replace('$', '');
    }

}

module.exports = ProductDetailsPage;
