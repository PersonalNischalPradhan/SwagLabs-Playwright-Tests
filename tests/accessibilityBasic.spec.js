import path from 'path';
import fs from 'fs';
import { injectAxe, getViolations } from 'axe-playwright';
import { test, expect } from '@playwright/test';
const loginData = require('../properties/loginProperties');  // Assuming loginData has necessary URL
const urlData = require('../properties/accessibilityUrlsProperties');  // Assuming urlData has necessary URL

let allViolations = []; // Collect all violations globally

// Generate HTML report function with Pie Chart, Bar Graph, and Status Bar
async function generateHtmlReport(violations, reportTitle) {
    const severityCounts = {
        critical: 0,
        serious: 0,
        moderate: 0,
        minor: 0,
    };

    violations.forEach((violation) => {
        switch (violation.impact) {
            case 'critical':
                severityCounts.critical++;
                break;
            case 'serious':
                severityCounts.serious++;
                break;
            case 'moderate':
                severityCounts.moderate++;
                break;
            case 'minor':
                severityCounts.minor++;
                break;
            default:
                break;
        }
    });

    const outputDir = path.resolve(__dirname, '../reports');
    const filename = `${reportTitle}-accessibility-report.html`;
    const reportPath = path.join(outputDir, filename);

    // Create reports directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Accessibility Violations Report - ${reportTitle}</title>
            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                }
                .container {
                    display: flex;
                    justify-content: space-evenly; /* Adjust space between the charts */
                    margin-bottom: 20px;
                }
                .chart-container {
                    width: 40%;  /* Adjust width to fit smaller charts */
                    display: flex;
                    justify-content: center;
                }
                .status-bar {
                    width: 30%;
                    padding-left: 20px;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                }
                .status-bar div {
                    margin: 10px 0;
                    padding: 5px;
                    display: flex;
                    align-items: center;
                }
                .color-box {
                    width: 20px;
                    height: 20px;
                    margin-right: 10px;
                }
                h2 {
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <h1>Accessibility Violations Report - ${reportTitle}</h1>
            <p>Total Violations: ${violations.length}</p>
            <ul>
                ${violations
                    .map(
                        (violation, index) => `
                        <li>
                            <strong>${index + 1}. ${violation.description}</strong>
                            <p>Impact: ${violation.impact}</p>
                            <p>Help URL: <a href="${violation.helpUrl}" target="_blank">${violation.helpUrl}</a></p>
                            <p>Nodes affected: ${violation.nodes.length}</p>
                        </li>
                    `
                    )
                    .join('')}
            </ul>

            <!-- Pie Chart and Bar Graph Container -->
            <div class="container">
                <!-- Pie Chart for severity distribution -->
                <div class="chart-container">
                    <canvas id="severityChart" width="150" height="150"></canvas>
                </div>

                <!-- Bar Graph for severity distribution -->
                <div class="chart-container">
                    <canvas id="barGraph" width="150" height="150"></canvas>
                </div>
            </div>

            <!-- Status Bar with labels -->
            <div class="status-bar">
                <h3>Severity Status</h3>
                <div><div class="color-box" style="background-color: red;"></div> Critical</div>
                <div><div class="color-box" style="background-color: yellow;"></div> Serious</div>
                <div><div class="color-box" style="background-color: lightblue;"></div> Moderate</div>
                <div><div class="color-box" style="background-color: lightgreen;"></div> Minor</div>
            </div>

            <script>
                // Pie Chart
                const pieCtx = document.getElementById('severityChart').getContext('2d');
                const severityPieChart = new Chart(pieCtx, {
                    type: 'pie',
                    data: {
                        labels: ['Critical', 'Serious', 'Moderate', 'Minor'],
                        datasets: [{
                            label: 'Severity Distribution',
                            data: [${severityCounts.critical}, ${severityCounts.serious}, ${severityCounts.moderate}, ${severityCounts.minor}],
                            backgroundColor: ['red', 'yellow', 'lightblue', 'lightgreen'],
                            borderColor: ['#cccccc', '#b3b3b3', '#99b3b3', '#99cc99'],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'bottom',
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(tooltipItem) {
                                        return tooltipItem.label + ': ' + tooltipItem.raw + ' violations';
                                    }
                                }
                            }
                        }
                    }
                });

                // Bar Graph
                const barCtx = document.getElementById('barGraph').getContext('2d');
                const severityBarGraph = new Chart(barCtx, {
                    type: 'bar',
                    data: {
                        labels: ['Critical', 'Serious', 'Moderate', 'Minor'],
                        datasets: [{
                            label: 'Severity Count',
                            data: [${severityCounts.critical}, ${severityCounts.serious}, ${severityCounts.moderate}, ${severityCounts.minor}],
                            backgroundColor: ['red', 'yellow', 'lightblue', 'lightgreen'],
                            borderColor: ['#cccccc', '#b3b3b3', '#99b3b3', '#99cc99'],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                display: false
                            }
                        },
                        scales: {
                            x: {
                                beginAtZero: true
                            },
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            </script>
        </body>
        </html>
    `;

    // Write HTML report to file
    fs.writeFileSync(reportPath, htmlContent, 'utf-8');
    console.log(`HTML report generated: ${reportPath}`);
}

test.describe('Accessibility Testing Suite', () => {
    test.only('should check accessibility on the cart page', async ({ page }) => {
        await page.goto(urlData.urls.cartUrl, { waitUntil: 'load' });
        await injectAxe(page);

        const violations = await getViolations(page);
        console.log(`Found ${violations.length} accessibility violations on the cart page.`);

        // Add violations to the global list
        allViolations.push(...violations);

        // Fail the test if there are violations
        expect(violations.length).toBe(0);  // This ensures that if violations are found, the test fails

        // Generate individual report
        await generateHtmlReport(violations, 'cart-page');
    });

    test.only('should check accessibility on the checkout page', async ({ page }) => {
        await page.goto(urlData.urls.checkoutUrl, { waitUntil: 'load' });
        await injectAxe(page);

        const violations = await getViolations(page);
        console.log(`Found ${violations.length} accessibility violations on the checkout page.`);

        // Add violations to the global list
        allViolations.push(...violations);

        // Fail the test if there are violations
        expect(violations.length).toBe(0);  // This ensures that if violations are found, the test fails

        // Generate individual report
        await generateHtmlReport(violations, 'checkout-page');
    });

    // Add other tests as needed for each page
    // ...

    // After all tests, generate a consolidated report
    test.afterAll(async () => {
        console.log(`Generating consolidated accessibility report with ${allViolations.length} total violations.`);
        await generateHtmlReport(allViolations, 'SWAG-LABS-Accessibility-Report');
    });
});
