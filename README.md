# SwagLabs-Playwright-Tests

## Project Overview
SwagLabs-Playwright-Tests is an automated testing project using Playwright using Javascript to test the Swag Labs application. This project demonstrates how to implement end-to-end testing .This project is set up to automatically run tests whenever changes are pushed to the dev branch or a pull request is made, which is more integrated and cost effective.

### Contents -Instructions to run this Project in your local:

- Features
- Prerequisites
- Installation
- Usage
- Running Tests
  - Running Tests Locally
  - Running Tests Automatically on GitHub
  - Running Tests Manually on GitHub
- Final Note

### Features
- Cross-browser testing with Playwright
- E2E Automated tests for various user interactions
- Support test run on github
- Screenshot and video recording of test runs during failure(can be customsied)

### Prerequisites
Before you begin, ensure that you have the following installed in your system:
- Node.js (v20 or later)
- npm (Node package manager)

i) Install Node.js
Download and install Node.js from the official website. Choose the version that is (v20 or later).

ii) Set Environment Variables
For Windows:

Click on the Windows icon, type “Env” and click on the “Edit Environment Variables for your Account.”

Enter the following Environment Variables:

NODE_HOME → C:\Program Files\nodejs
PATH → C:\Program Files\nodejs;

### Installation
To get started, clone the repository and install the necessary dependencies:

```bash

git clone https://github.com/PersonalNischalPradhan/SwagLabs-Playwright-Tests.git

cd SwagLabs-Playwright-Tests

Launch Visual Studio Code: Open the Visual Studio Code application on your computer.

Open the Project Folder: that was cloned above

Click on File in the top menu, then select Open Folder.

Navigate to the designated folder where your Playwright project is located.
Select the folder containing your package.json file (this file indicates that the folder is a Node.js project).
Install Playwright Dependencies (if not already done):

Open a new terminal in Visual Studio Code by clicking on Terminal in the top menu and selecting New Terminal.

npm install    #if this is not done then you will get MODULE_NOT_FOUND 
```
**Usage**
```bash

To run your tests, use the command below. This will execute all tests defined in the tests folder.

npx playwright test

```
**Running Tests**

__Running Tests Locally__
```bash

To run tests locally, you can execute the following command in your terminal:


npx playwright test

or 

npx playwright test --reporter=html          
 
(if you want the report to publish directly after the run)

You can also run the tests in headless mode (useful for CI/CD) by adding the --headless option:

npx playwright test --headless

In case you want to see the browser interactions, you can run:

npx playwright test --headed

```
**Running Tests Automatically on GitHub**
```bash

This project is set up to automatically run tests whenever changes are pushed to the dev branch or a pull request is made. 

Belown shows how the GitHub Actions workflow works:

Config : The .github/workflows/playwright-tests.yml file is configured to:

Checkout the code.
Set up Node.js.
Install dependencies.
Run Playwright tests.
Upload test artifacts and HTML reports.
Triggering the Workflow

The tests will run automatically on:
Any push to the dev branch.
Any pull request targeting the dev branch.

```
**Running Tests Manually on GitHub**
```bash

You can also manually trigger the workflow from the GitHub Actions tab.

Viewing the Results: After the tests run, you can check the GitHub Actions page to see the test results. If tests fail, the workflow will show error logs, and you can download the HTML report from the artifacts section by doing so a SwagLabs-Playwright-HTML-Report zip file will get downloaded. Inside that file you will have index.html .

Open index.html in a browser , you can see the report .

```
**FinalNote** : Please feel free to submit a pull request or shout for any issue.