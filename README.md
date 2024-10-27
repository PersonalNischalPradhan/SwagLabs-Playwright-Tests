# SwagLabs-Playwright-Tests

## Overview
SwagLabs-Playwright-Tests is an automated testing project using Playwright using Javascript to test the Swag Labs application. This project demonstrates how to implement end-to-end testing and running tests on github directly which is more integrated and cost effective.

## Contents -Instructions to run this Project in your local:

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Running Tests](#running-tests)
  - [Running Tests Locally](#running-tests-locally)
  - [Running Tests Automatically on GitHub](#running-tests-automatically-on-github)
  - [Running Tests Manually on GitHub](#running-tests-manually-on-github)
- [Final Note](#finalnote)


## Features
- Cross-browser testing with Playwright
- E2E Automated tests for various user interactions
- Support test run in github
- Screenshot and video recording of test runs during failure(can be customsied)

## Prerequisites
Before you begin, ensure you have the following installed:
- Node.js (v20 or later)
- npm (Node package manager)

## Installation
To get started, clone the repository and install the necessary dependencies:

```bash
git clone https://github.com/PersonalNischalPradhan/SwagLabs-Playwright-Tests.git
cd SwagLabs-Playwright-Tests
npm install  #if this is not done then you will get MODULE_NOT_FOUND 


Usage
To run your tests, use the command below. This will execute all tests defined in the tests folder.
npx playwright test


Running Tests

Running Tests Locally
To run tests locally, you can execute the following command in your terminal:

npx playwright test

or 

npx playwright test --reporter=html  (if you want the report to publish directly after the run)

You can also run the tests in headless mode (useful for CI/CD) by adding the --headless option:

npx playwright test --headless

In case you want to see the browser interactions, you can run:

npx playwright test --headed

Running Tests Automatically on GitHub

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

Running Tests Manually on GitHub

You can also manually trigger the workflow from the GitHub Actions tab.

Viewing the Results: After the tests run, you can check the GitHub Actions page to see the test results. If tests fail, the workflow will show error logs, and you can download the HTML report from the artifacts section.

FinalNote : Please feel free to submit a pull request or open an issue.