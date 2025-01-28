import { test, expect } from "@playwright/test";
import { Application } from "../../app";
import { loginFixture } from "../../fixtures";
import fs from "fs";
import path from 'path';

test('modify request headers', async ({ page }) => {
    const App = new Application(page);
    let isHeaderExists = false;

    // Intercept network requests
    await page.route("**/*", async (route, request) => {
        const headers = request.headers();

        headers["myHeader"] = "myValue"

        // Continue the route with modified headers
        await route.continue({ headers });

        if (headers['myHeader']) {
            isHeaderExists = true;
        }
    });

    await App.form.open();
    expect(isHeaderExists).toBe(true);
});

loginFixture("abort images and replace with own", async ({ App, defaultAdmin, page }) => {
    const myImagePath = path.join(__dirname, '..', '..', 'interceptImage.jpeg');
    const myImage = fs.readFileSync(myImagePath);

    await page.route("**/*", async (route) => {
        const headers = route.request().headers();

        if (route.request().resourceType() === "image") {
            await route.fulfill({
                status: 200,
                contentType: "image/jpeg",
                body: myImage
            });
        } else {
            await route.continue({
                headers: {
                    ...headers,
                    abort: "true"
                }
            });
        }
    });
    await page.reload({ waitUntil: "domcontentloaded" });
    // await page.pause(); uncomment if you want to see that image was replaced with spaghetti instead of pizza
});

test("mock response before hit API", async ({ page }) => {
    let interceptedResponse: { status: number; body: string } | null = null;

    await page.route("**/getHiddenField", async (route) => {
        interceptedResponse = {
            status: 404,
            body: "OOPS! This page doesn't exists anymore!"
        };
        await route.fulfill(interceptedResponse);
    });
    await page.goto("https://webdriver.io/");
    await page.getByRole("link", { name: "Get Started" }).click();
    await expect(page.getByRole("heading", { name: "Getting Started " })).toBeVisible();
    expect(interceptedResponse).toMatchObject({
        status: 404,
        body: "OOPS! This page doesn't exists anymore!"
    });
});

test("mock/modify API response", async ({ page }) => {
    const URL = "https://the-internet.herokuapp.com/add_remove_elements/";

    await page.route(URL, async (route) => {
        const response = await route.fetch();
        let body = await response.text();
        body = body.replace("<h3>Add/Remove Elements", "<h3>IT IS GONE!");
        await route.fulfill({ response, body });
    });
    await page.goto(URL);
    await expect(page.getByRole("heading", { name: "IT IS GONE" })).toBeVisible();

});