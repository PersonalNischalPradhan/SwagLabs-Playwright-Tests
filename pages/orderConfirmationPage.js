class OrderConfirmationPage {
    constructor(page, commandPage) {
      this.page = page;
      this.commandPage = commandPage; 
    }

  
    // Method to get the order confirmation message
    async getOrderConfirmationText() {
      return await this.page.textContent(this.commandPage.orderConfirmationMessage);
    }
  }
  
  module.exports = OrderConfirmationPage;
  
