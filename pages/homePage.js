class HomePage {
    constructor(page, commandPage) {
      this.page = page;
      this.commandPage = commandPage; // Reference to CommandPage
    }
  
    // Method to navigate to the product lister page
    async navigateToProductLister() {
      await this.page.click(this.commandPage.productListerLink);
    }
  }
  
  module.exports = HomePage;
  