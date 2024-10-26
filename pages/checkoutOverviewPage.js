class CheckoutOverviewPage {
    constructor(page, commandPage) {
      this.page = page;
      this.commandPage = commandPage; // Reference to CommandPage
    }
  
    // Method to fill out payment details and confirm the order
    async checkoutOverviewBtnClick() {
      await this.page.click(this.commandPage.continueButton);
    }
  
    // Method to get the order confirmation message
    async getOrderConfirmationText() {
      return await this.page.textContent(this.commandPage.orderConfirmationMessage);
    }
  }
  
  module.exports = CheckoutOverviewPage;
  
  
  
  