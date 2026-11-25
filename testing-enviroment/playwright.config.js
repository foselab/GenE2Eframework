const { defineConfig, devices } = require('@playwright/test');
const path = require('path');
const TestResultReporter = require('./models/test-result-reporter'); // Assicurati che il percorso sia corretto

require('dotenv').config({ path: path.resolve(__dirname, '.env') });

module.exports = defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 3,
  reporter: [
    ['list'], // Reporter HTML predefinito di Playwright
    ['./models/test-result-reporter.js'] // Se non usi argomenti opzionali, passa il percorso come stringa
  ],
  timeout: 120000,
  use: {
    trace: 'off',
    video: 'on',
    launchOptions: {
      slowMo: 0,
    },
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    }
  ],
});

global.basePath = path.resolve(__dirname);

