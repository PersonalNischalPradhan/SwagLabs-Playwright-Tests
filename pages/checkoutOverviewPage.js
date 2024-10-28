class CheckoutOverviewPage {
  constructor(page, commandPage) {
    this.page = page;
    this.commandPage = commandPage;
  }

  // Method to fill out payment details and confirm the order
  async checkoutOverviewBtnClick() {
    await this.page.click(this.commandPage.continueButton);
  }

  // Method to get the order confirmation message
  async getOrderConfirmationText() {
    return await this.page.textContent(this.commandPage.orderConfirmationMessage);
  }
  // Method to get product price from checkout overview page
  async getProductPriceFromCheckoutOverview() {
    const checkoutOverviewPrice = await this.page.locator('.inventory_item_price').textContent();
    return checkoutOverviewPrice.replace('$', '');
  }
}

module.exports = CheckoutOverviewPage;



