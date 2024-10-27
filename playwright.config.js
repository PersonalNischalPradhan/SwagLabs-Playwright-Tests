// playwright.config.js
const { defineConfig } = require('@playwright/test');
const fs = require('fs'); // Import the fs module

// Ensure the screenshots directory exists
const screenshotsDir = 'test-results/screenshots';
if (!fs.existsSync(screenshotsDir)){
    fs.mkdirSync(screenshotsDir, { recursive: true });
}

module.exports = defineConfig({
  use: {
    baseURL: 'https://www.saucedemo.com/v1/index.html', // Define the base URL here
    headless: false, // Optional: run browser in non-headless mode
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure', // Capture screenshots on failure
    video: 'retain-on-failure',   // Captures videos only on test failures
  },
  reporter: [
    ['html', { outputFolder: 'test-results', open: 'never' }], // Generates HTML reports
    ['list'], // You can keep the list reporter
  ],
});
