import { expect, test } from "@playwright/test";
import { Application } from "../app";
import { API } from "../api";

export const baseFixture = test.extend<{ App: Application; Api: API }>({
  App: async ({ page }, use) => {
    const app = new Application(page);
    await use(app);
  },
  Api: async ({ request }, use) => {
    const api = new API(request);
    await use(api);
  },
});

export const loginFixture = baseFixture.extend<
  DefaultAdmin & { App: Application }
>({
  defaultAdmin: [
    {
      username: "randomName@test.com",
      password: "AEZAKMI",
    },
    {
      option: true,
    },
  ],
  App: async ({ App, defaultAdmin }, use) => {
    await App.auth.open();
    await App.auth.login(defaultAdmin.username, defaultAdmin.password);
    await expect(App.auth.addToCart).toBeVisible();
    await use(App);

    console.log("Teard down: executes after test");
  },
});

export const loginAndOrderPizza = loginFixture.extend<
  DefaultIngredients & { App: Application }
>({
  testOptions: [
    {
      ingredients: [
        {
          size: "large",
          flavour: "Cheese",
          sauce: "Buffalo",
          topping: "Onions",
          quantity: 1,
        },
      ],
    },
    {
      option: true,
    },
  ],

  App: async ({ App, testOptions }, use) => {
    for (const pizza of testOptions.ingredients) {
      try {
        await App.orderSubmit.compoundPizza(pizza);
        await App.orderSubmit.addPizzaToCart();
        await App.orderSubmit.verifyAddingToCart();
        await App.orderSubmit.verifyCompoundedPizza();
        console.log(
          `New pizza with: ${JSON.stringify(
            pizza
          )} has been successfully added!`
        );
      } catch (error) {
        throw new Error(`Error with adding ${pizza} !`);
      }
    }
    await use(App);
  },
});
