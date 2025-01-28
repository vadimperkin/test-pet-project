import path from 'path';
import dotenv from 'dotenv';
import { defineConfig, devices } from '@playwright/test';

// Read from ".env" file.
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<DefaultAdmin & DefaultIngredients>({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Opt out of parallel tests on CI. */
  workers: process.env.GITHUB_RUN_ID ? 3 : process.env.DEBUG ? 1 : 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  reportSlowTests: null,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: 'https://play1.automationcamp.ir',
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    headless: process.env.GITHUB_RUN_ID ? true : false,
  },
  expect: {
    timeout: 7000,
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chrome',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1720, height: 980 },
        defaultAdmin: {
          username: process.env.USERNAME!,
          password: process.env.PASSWORD!
        },
      },
    },


    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
