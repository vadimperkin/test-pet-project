import { test } from "@playwright/test";
import { Application } from "../../app";

test("should check experience form", async ({ page }) => {
    const App = new Application(page);
    await App.form.open();
    await App.form.fillExperience(3);
    await App.form.verifyExperience(3);
});

test("should check 1 language checkbox", async ({ page }) => {
    const App = new Application(page);
    await App.form.open();
    await App.form.pickLanguage("python");
    await App.form.verifyPickLanguage("python");
});

test("should check many language checkboxes", async ({ page }) => {
    const App = new Application(page);
    await App.form.open();
    await App.form.pickLanguage("python");
    await App.form.verifyPickLanguage("python");

    await App.form.pickLanguage("javascript");
    await App.form.verifyPickLanguage("python javascript");

    await App.form.pickLanguage("javascript");
    await App.form.verifyPickLanguage("python");

    await App.form.pickLanguage("python");
    await App.form.verifyPickLanguage("");
});

test("should upload a file", async ({ page }) => {
    const App = new Application(page);
    await App.form.open();
    await App.form.uploadCV("data/test.txt");
    await App.form.verifyUploadedCV("test.txt");
});

test("should check 'Speaks German' toggle", async ({ page }) => {
    const App = new Application(page);
    await App.form.open();
    await App.form.verifySpeaksGerman();

    await App.form.toggleSpeaksGerman();
    await App.form.verifySpeaksGerman("true");

    await App.form.toggleSpeaksGerman();
    await App.form.verifySpeaksGerman("false");
});

test("should check skills dropdown", async ({ page }) => {
    const App = new Application(page);
    await App.form.open();
    await App.form.pickPrimarySkill("Cypress");
    await App.form.verifyPickedPrimarySkill("cyp");
    await App.form.pickPrimarySkill("Selenium");
    await App.form.verifyPickedPrimarySkill("sel");
});