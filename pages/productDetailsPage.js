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
    async addAllProductsToCart() {
        // Wait for the product items to load
        const products = await this.page.$$(this.commandPage.productItem);

        // Use a traditional for loop to iterate through each product
        for (let i = 0; i < products.length; i++) {
            const product = products[i]; // Get the product at index i
            const addToCartButton = await product.$(this.commandPage.addToCartButton);

            if (addToCartButton) {
                await addToCartButton.click(); // Click the "Add to Cart" button
                await this.page.waitForTimeout(200); // Optional delay
            }
        }
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
