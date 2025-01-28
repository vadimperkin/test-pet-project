import { Locator, expect } from "@playwright/test";
import { AppPage } from "../abstract";

export class WaitCondition extends AppPage {
    public pagePath: string = "/expected_conditions.html";

    public confirmedPrompt = this.page.getByText("Confirm response: OK");
    public confirmedAlert = this.page.getByText("Alert handled");
    private showAlertBtn = (btnName: string) => this.page.getByRole("button", { name: btnName });
    private minMaxWaitBox = this.page.locator("div.card-header.justify-content-center");
    private minInput = this.page.locator("#min_wait");
    private maxInput = this.page.locator("#max_wait");
    private triggerHiddenBtn = this.page.locator("#visibility_trigger").getByText("Trigger");
    private appearedHiddenBtn = this.page.locator("#visibility_target").getByText("Click Me");
    private appearedHiddenText = this.page.getByText("Can you see me?");

    async expectLoaded(): Promise<void> {
        await expect(this.minMaxWaitBox).toBeVisible();
        await expect(this.minInput).toBeEditable();
    }

    /**
     * Set min and max values to form
     * @param min 
     * @param max 
     */
    async setMinMaxAmount(min: number | string, max: number | string): Promise<void> {
        await this.minInput.fill(min.toString());
        await this.maxInput.fill(max.toString());
        await expect(this.minInput).toHaveValue(min.toString());
        await expect(this.maxInput).toHaveValue(max.toString());
    }

    /**
     * Click on buttons in wait for condition page.
     * @param name "Show Alert" or "Show Propmpt"
     */
    async showBtnClick(name: string): Promise<void> {
        await this.showAlertBtn(name).click();
    }

    /**
     * Clicks on trigger buttons.
     */
    async triggerHiddenText() {
        await this.triggerHiddenBtn.click();
        await this.appearedHiddenBtn.click();
    }

    async verifyHiddenText() {
        await expect(this.appearedHiddenText).toBeVisible();
    }

    async verifyShowPopUpAccepted(popUp: Locator): Promise<void> {
        await expect(popUp).toBeVisible();
    }
}