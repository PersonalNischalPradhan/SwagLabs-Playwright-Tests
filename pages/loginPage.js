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
        const errorMessageLocator = this.commandPage.loginErrorText; // Use the defined selector
        const errorMessage = this.page.locator(errorMessageLocator);
        
        // Wait for the error message to be visible
        await errorMessage.waitFor({ state: 'visible' });
        
        // Get the text content of the error message
        const errorMessageText = await errorMessage.textContent();
        
        // Return the trimmed text to avoid extra spaces
        return errorMessageText.trim();
    }
  }
  
  module.exports = LoginPage;
  