const { test, expect } = require('@playwright/test');
const loginData = require('../properties/loginProperties');
const CommandPage = require('../pages/CommandPage');

test.describe('SWAG LABS Application - Login Scenarios', () => {

    test.beforeEach(async ({ page }) => {
        // Initialize CommandPage before each test and navigate to the login URL
        const commandPage = new CommandPage(page);
        await page.goto(loginData.urls.swaglabsUrl);
    });

    /* Verify Standard User Login:
    * Verify that the user can log in successfully, reach the home screen, and see the products displayed.
    */

    test('should log in successfully with standard user', async ({ page }) => {
        const commandPage = new CommandPage(page);
        await commandPage.loginPage.login(loginData.account.usernames[0], loginData.account.password);

        // Add assertions to verify successful login
        const pageTitle = await page.title();
        expect(pageTitle).toBe(loginData.titles.swaglabs);

        // Additional validation, e.g., check for presence of product page or dashboard
        const isLoggedIn = await page.locator(commandPage.inventoryList).isVisible();
        expect(isLoggedIn).toBeTruthy();
    });

    /* Verify Problem User Login:
    * Verify that the user can log in successfully, reach the home screen, and see the products displayed.
    */

    test('should log in successfully with problem user', async ({ page }) => {
        const commandPage = new CommandPage(page);
        await commandPage.loginPage.login(loginData.account.usernames[1], loginData.account.password);

        // Add assertions to verify successful login
        const pageTitle = await page.title();
        expect(pageTitle).toBe(loginData.titles.swaglabs);


        // Additional validation, e.g., check for presence of product page or dashboard
        const isLoggedIn = await page.locator(commandPage.inventoryList).isVisible();
        expect(isLoggedIn).toBeTruthy();
    });

    /* Verify Performance Glitch User Login:
    * Verify that the user can log in successfully, reach the home screen, and see the products displayed.
    */

    test('should log in successfully with performance glitch user', async ({ page }) => {
        const commandPage = new CommandPage(page);
        await commandPage.loginPage.login(loginData.account.usernames[3], loginData.account.password);

        // Add assertions to verify successful login
        const pageTitle = await page.title();
        expect(pageTitle).toBe(loginData.titles.swaglabs);

        // Additional validation, e.g., check for presence of product page or dashboard
        const isLoggedIn = await page.locator(commandPage.inventoryList).isVisible();
        expect(isLoggedIn).toBeTruthy();
    });

    /* Verify Locked User Login:
    * Verify that the user is not able to log in ,and locked out error message is displayed.
    */

    test('should show locked out message for locked_out_user', async ({ page }) => {
        const commandPage = new CommandPage(page);
        await commandPage.loginPage.login(loginData.account.usernames[2], loginData.account.password);  // locked_out_user

        // Verify locked out error message
        const errorMessage = await commandPage.loginPage.getErrorMessage();
        expect(errorMessage).toContain(loginData.errorMessages.lockedOut);
    });

    /* Verify Invalid User Login:
    * Verify that the user is not able to log in ,and wrong usernamee error message is displayed.
    */

    test('should show error message for invalid username', async ({ page }) => {
        const commandPage = new CommandPage(page);
        await commandPage.loginPage.login(loginData.wrongCredentials.wrongUsernames[0], loginData.account.password);

        // Verify error message for wrong username
        const errorMessage = await commandPage.loginPage.getErrorMessage();
        expect(errorMessage).toContain(loginData.wrongCredentials.errorMessage);
    });


    /* Verify User Login with Invalid Password :
    * Verify that the user is not able to log in ,and wrong password error message is displayed.
    */

    test('should show error message for invalid password', async ({ page }) => {
        const commandPage = new CommandPage(page);
        await commandPage.loginPage.login(loginData.account.usernames[0], loginData.wrongCredentials.wrongPasswords[0]);

        // Verify error message for wrong password
        const errorMessage = await commandPage.loginPage.getErrorMessage();
        expect(errorMessage).toContain(loginData.wrongCredentials.errorMessage);
    });

    /* Verify User Login with Invalid Username and Invalid Password  :
    * Verify that the user is not able to log in ,and wrong username and password error message is displayed.
    */

    test('should show error message for invalid username and password', async ({ page }) => {
        const commandPage = new CommandPage(page);
        await commandPage.loginPage.login(loginData.wrongCredentials.wrongUsernames[1], loginData.wrongCredentials.wrongPasswords[1]);

        // Verify error message for both wrong username and password
        const errorMessage = await commandPage.loginPage.getErrorMessage();
        expect(errorMessage).toContain(loginData.wrongCredentials.errorMessage);
    });
});
