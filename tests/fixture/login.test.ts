import { expect } from "@playwright/test";
import { loginFixture } from "../../fixtures";

/**
 * Login with fixture (shows power of fixture).
 */
loginFixture("check login flow", async ({ App, defaultAdmin }) => {
    console.log(defaultAdmin.username + " " + defaultAdmin.password);
    await expect(App.auth.addToCart).toBeVisible(); // this assert exists inside fixture, here it's just to show that we are logged in
});