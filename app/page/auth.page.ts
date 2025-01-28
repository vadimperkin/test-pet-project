import { expect } from "@playwright/test";
import { AppPage } from "../abstract";

export class Auth extends AppPage {
  public pagePath: string = "/login.html";

  public addToCart = this.page.getByRole("button", { name: "Add to Cart" });

  private header = this.page.getByRole("heading", { name: "Log in" });
  private username = this.page.locator("#user");
  private password = this.page.locator("#password");
  private loginBtn = this.page.getByRole("button", { name: "Log in" });
  private loginErrorMsg = this.page.getByText(
    "Incorrect username or password. Try again!!"
  );

  async login(username: string, password: string) {
    await this.username.fill(username, { timeout: 4000 });
    await this.password.fill(password);
    await this.loginBtn.click();
    if (!await this.loginErrorMsg.isVisible()) {
      await expect(this.addToCart).toBeVisible(); // check that we are logged in
    }
  }

  async expectLoaded(): Promise<void> {
    await expect(this.header).toBeVisible();
    await expect(this.username).toBeVisible();
    await expect(this.password).toBeVisible();
    await expect(this.loginBtn).toBeEnabled();
  }

  async expectLoginFailed(): Promise<void> {
    await expect(this.loginErrorMsg).toBeVisible();
  }
}
