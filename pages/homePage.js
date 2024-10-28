class HomePage {
  constructor(page, commandPage) {
    this.page = page;
    this.commandPage = commandPage;
  }

  // Method to navigate to the product lister page
  async navigateToProductLister() {
    await this.page.click(this.commandPage.inventoryItemName);
  }
  //Method to get basket item count
  async getCartItemCount() {
    return await this.page.locator(this.commandPage.cartItemCountLocator).innerText();
  }
  // Method to select sorting option by value
  async selectSortingOption(optionValue) {
    await this.page.selectOption(this.commandPage.productSortDropdown, optionValue);
  }
  //Method to add all items to cart
  async addAllProductsToCart() {
    const products = await this.page.$$(this.commandPage.productItem);
    for (let i = 0; i < products.length; i++) {
      const product = products[i]; // Get the product at index i
      const addToCartButton = await product.$(this.commandPage.addToCartButton);
      if (addToCartButton) {
        await addToCartButton.click();
        await this.page.waitForTimeout(200);
      }
    }
  }

  // Method to retrieve all inventory item names as a list
  async getInventoryItemNames() {
    return await this.page.locator(this.commandPage.inventoryItemName).allTextContents();
  }

  // Method to retrieve all inventory item price as a list
  async getInventoryItemPrice() {
    const priceList = await this.page.locator(this.commandPage.inventoryItemPrice).allTextContents();
    return priceList.map(price => parseFloat(price.replace('$', '').trim()));
  }
  // Method to add the product to the cart
  async addToCart() {
    await this.page.click(this.commandPage.addToCartButton);
  }

  // Method to click on the basket icon
  async clickOnBasketIcon() {
    await this.page.click(this.commandPage.basketIcon);
  }
  //Method to get price using product name from the lister page
  async getProductPriceFromListerPage(productName) {
    const listerPrice = await this.page
      .locator('.inventory_item')
      .filter({ has: this.page.locator('.inventory_item_name', { hasText: productName }) })
      .locator('.inventory_item_price')
      .textContent();
    return listerPrice.replace('$', '');

  }
}

module.exports = HomePage;
