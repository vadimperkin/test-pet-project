import path from "path";
import dotenv from "dotenv";
import { defineConfig, devices } from "@playwright/test";

// Read from ".env" file.
dotenv.config({ path: path.resolve(__dirname, ".env") });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<ConfigTypes>({
  name: "Global config",
  testDir: "./tests",
  fullyParallel: false,
  forbidOnly: !!process.env.GITHUB_RUN_ID,
  quiet: !!process.env.GITHUB_RUN_ID,
  workers: process.env.GITHUB_RUN_ID ? 2 : 1,
  reporter: process.env.GITHUB_RUN_ID ? "blob" : "html",
  reportSlowTests: null,
  use: {
    baseURL: "https://play1.automationcamp.ir",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    viewport: { width: 1720, height: 980 },
    headless: !!process.env.GITHUB_RUN_ID,
  },
  expect: {
    timeout: 7000,
  },
  projects: [
    {
      name: "chrome",
      retries: 1,
      use: {
        ...devices["Desktop Chrome"],
        defaultAdmin: {
          username: process.env.USERNAME!,
          password: process.env.PASSWORD!,
        },
      },
    },
  ],
});
