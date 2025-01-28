import { test } from "@playwright/test";
import { TestRunner } from "./keywordClass.";
import { testData } from "./testData";

test("keyword-driven test", async ({ page }) => {
    const runner = new TestRunner(page);
    await runner.runTests(testData);
})