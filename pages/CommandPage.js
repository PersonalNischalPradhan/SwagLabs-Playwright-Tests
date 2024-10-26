const LoginPage = require('./loginPage');
const HomePage = require('./homePage');
const ProductDetailsPage = require('./productDetailsPage');
const CheckoutPage = require('./checkoutPage');
const CheckoutOverviewPage = require('./checkoutOverviewPage');
const OrderConfirmationPage = require('./orderConfirmationPage');

class CommandPage {
  constructor(page) {
    this.page = page;

    // Centralized WebElement Selectors

    // Login Page Selectors
    this.usernameInput = '#user-name';
    this.passwordInput = '#password';
    this.loginButton = '#login-button';
    this.loginErrorText = "h3[data-test='error']";

    // Home Page Selectors
    this.inventoryItemName = '.inventory_item_name';
    this.inventoryList = '.inventory_list';
    this.inventoryItemPrice='.inventory_item_price';
    this.productSortDropdown='.product_sort_container';
    this.cartItemCountLocator = '.fa-layers-counter.shopping_cart_badge';

    // Product Lister & Product Details Page Selectors
    this.productItem = '.inventory_item';
    this.addToCartButton = '.btn_primary';
    this.basketIcon = 'svg.fa-shopping-cart'
    this.proceedToCheckoutButton = '.checkout_button';

    // Checkout Page Selectors
    this.paymentDetailsFN = '#first-name';
    this.paymentDetailsLN = '#last-name';
    this.paymentDetailsPC = '#postal-code';
    this.continueButton = '.cart_button';


    // Checkout Overview Page Selectors
    this.finishButton = '.cart_button';

    // Order Confirmation Page Selectors
    this.orderConfirmationMessage = '.complete-header';

    // Initialize action files
    this.loginPage = new LoginPage(page, this);
    this.homePage = new HomePage(page, this);
    this.productDetailsPage = new ProductDetailsPage(page, this);
    this.checkoutPage = new CheckoutPage(page, this);
    this.CheckoutOverviewPage = new CheckoutOverviewPage(page, this);
    this.OrderConfirmationPage = new OrderConfirmationPage(page, this);
  }
}

module.exports = CommandPage;
