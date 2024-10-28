const checkoutData = require('../properties/checkoutProperties');
class CheckoutPage {
  constructor(page, commandPage) {
    this.page = page;
    this.commandPage = commandPage;
  }
  //Method to fill up the user details
  async checkout() {
    await this.page.fill(this.commandPage.paymentDetailsFN, checkoutData.userDetailsCheckout.firstName);
    await this.page.fill(this.commandPage.paymentDetailsLN, checkoutData.userDetailsCheckout.lastName);
    await this.page.fill(this.commandPage.paymentDetailsPC, checkoutData.userDetailsCheckout.postCode);
    await this.page.click(this.commandPage.continueButton);
  }
  // Mehtod to checkout with out filling up the user details
  async checkoutWithoutInfoDetails() {
    await this.page.fill(this.commandPage.paymentDetailsFN, '');
    await this.page.fill(this.commandPage.paymentDetailsLN, '');
    await this.page.fill(this.commandPage.paymentDetailsPC, '');
    await this.page.click(this.commandPage.continueButton);
  }
}


module.exports = CheckoutPage;
