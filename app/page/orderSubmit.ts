import { expect } from "@playwright/test";
import { AppPage } from "../abstract";
import type { Ingredients } from "../models";

export class OrderSubmit extends AppPage {
    public pagePath: string = "/order_submit.html";

    private addToCart = this.page.getByRole("button", { name: "Add to Cart" });
    private pizzaSize = (size: string) => this.page.locator(`#rad_${size}`);
    private pizzaFlavour = this.page.locator("#select_flavor");
    private pizzaSauce = (sauce: string) => this.page.getByLabel(sauce);
    private pizzaTopping = (topping: string) => this.page.getByLabel(topping);
    private pizzaQuantity = this.page.locator("#quantity");
    private addingToCartDiv = this.page.getByText("Adding to the cart...");
    private addedPizzaMsg = this.page.getByRole("heading", { name: "Pizza added to the cart!" });
    private qtyError = this.page.getByText(" Quantity must be 1 or more!");
    private closeQtyErrorBtn = this.page.getByRole("button", { name: "Close" });

    async expectLoaded(): Promise<void> {
        await expect(this.addToCart).toBeVisible();
    }

    /**
     * Compound all pizza ingredients.
     * @param ingredients object with ingredients
     */
    async compoundPizza(ingredients: Ingredients) {
        await this.selectPizzaSize(ingredients.size);
        await this.selectPizzaFlavour(ingredients.flavour);
        await this.selectPizzaSauce(ingredients.sauce);
        await this.selectPizzaTopping(ingredients.topping);
        await this.selectPizzaQuantity(ingredients.quantity)
    }

    async addPizzaToCart() {
        await this.addToCart.click();
    }

    async verifyAddingToCart() {
        await expect(this.addingToCartDiv).toBeVisible();
        await this.addingToCartDiv.waitFor({ state: "hidden" });
    }

    async verifyCompoundedPizza() {
        await expect(this.addedPizzaMsg).toBeVisible();
    }

    async verifyNegativeQtyError() {
        await expect(this.qtyError).toBeVisible();
        await this.closeQtyErrorBtn.click();
    }

    private async selectPizzaSize(size: string) {
        await this.pizzaSize(size).click();
        await expect(this.pizzaSize(size)).toBeChecked();
    }

    private async selectPizzaFlavour(flavour: string) {
        await this.pizzaFlavour.selectOption(flavour);
        await expect(this.pizzaFlavour).toHaveValue(flavour);
    }

    private async selectPizzaSauce(sauce: string) {
        await this.pizzaSauce(sauce).click();
        await expect(this.pizzaSauce(sauce)).toBeChecked();
    }

    private async selectPizzaTopping(topping: string) {
        await this.pizzaTopping(topping).click();
        await expect(this.pizzaTopping(topping)).toBeChecked();
    }

    private async selectPizzaQuantity(qty: number) {
        await this.pizzaQuantity.fill(String(qty));
    }

}