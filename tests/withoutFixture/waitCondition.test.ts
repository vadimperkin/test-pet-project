import { test } from "@playwright/test";
import { Application } from "../../app";

test(`should trigger alert and accept it`, async ({ page }) => {
  const App = new Application(page);
  await App.waitCondition.open();
  await App.waitCondition.setMinMaxAmount(1, 3);
  page.on("dialog", async (dialog) => {
    console.log(dialog.message());
    await dialog.accept();
  });
  await App.waitCondition.showBtnClick("Show Alert");
  await App.waitCondition.verifyShowPopUpAccepted(App.waitCondition.confirmedAlert);
});

test("it should trigger and check elemennt appearing", async ({ page }) => {
  const App = new Application(page);
  await App.waitCondition.open();
  await App.waitCondition.setMinMaxAmount(1, 3);
  await App.waitCondition.triggerHiddenText();
  await App.waitCondition.verifyHiddenText();
});
