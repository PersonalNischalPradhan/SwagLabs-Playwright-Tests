class HomePage {
  constructor(page, commandPage) {
    this.page = page;
    this.commandPage = commandPage; // Reference to CommandPage
  }

  // Method to navigate to the product lister page
  async navigateToProductLister() {
    await this.page.click(this.commandPage.inventoryItemName);
  }

  async getCartItemCount() {
    return await this.page.locator(this.commandPage.cartItemCountLocator).innerText();
  }
  // Method to select sorting option by value
  async selectSortingOption(optionValue) {
    await this.page.selectOption(this.commandPage.productSortDropdown, optionValue);
  }

  // Method to retrieve all inventory item names as a list
  async getInventoryItemNames() {
    return await this.page.locator(this.commandPage.inventoryItemName).allTextContents();
  }

  // Method to retrieve all inventory item names as a list
  async getInventoryItemPrice() {
    const priceList = await this.page.locator(this.commandPage.inventoryItemPrice).allTextContents();
    return priceList.map(price => parseFloat(price.replace('$', '').trim()));
  }
}

module.exports = HomePage;
