class LoginPage {
    constructor(page, commandPage) {
        this.page = page;
        this.commandPage = commandPage; // Reference to CommandPage
    }
  
    // Method to login into the application using selectors from CommandPage
    async login(username, password) {
        await this.page.fill(this.commandPage.usernameInput, username);
        await this.page.fill(this.commandPage.passwordInput, password);
        await this.page.click(this.commandPage.loginButton);
    }
  
    async getErrorMessage() {
        const errorMessageLocator = this.commandPage.loginErrorText;
        const errorMessage = this.page.locator(errorMessageLocator);
        await errorMessage.waitFor({ state: 'visible' });
        const errorMessageText = await errorMessage.textContent();
        return errorMessageText.trim();
    }
  }
  
  module.exports = LoginPage;
  