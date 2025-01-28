import { expect } from "@playwright/test";
import { AppPage } from "../abstract";
import path from "path";

export class Form extends AppPage {
  public pagePath: string = "/forms.html";

  private formHeader = (name: string) => this.page.getByRole("heading", { name });
  private experience = this.page.locator("#exp");
  private experienceText = this.page.locator("#exp_help");
  private langCheckbox = (lang: string) => this.page.locator(`#check_${ lang }`);
  private langText = this.page.locator("#check_validate");
  private uploadCvBtn = this.page.locator("#upload_cv");
  private uploadCvText = this.page.locator("#validate_cv");
  private speaksGermanToggle = this.page.locator("label[for='german']");
  private speaksGermanBool = this.page.locator("#german_validate");
  private primarySkill = this.page.getByLabel("Primary Skill");
  private primarySkillText = this.page.locator("#select_tool_validate");

  async expectLoaded(): Promise<void> {
      await expect(this.formHeader("Basic Form Controls")).toBeVisible();
      await expect(this.formHeader("Form with Validations")).toBeVisible();
      await expect(this.formHeader("Non-English Labels and Locators")).toBeVisible();
      await expect(this.experience).toBeVisible();
  }

  async fillExperience(exp: number | string) {
    await this.experience.press(exp.toString());
  }

  async verifyExperience(text?: number | string) {
    await expect(this.experienceText).toBeVisible();
    if (text) await expect(this.experienceText).toHaveText(text.toString());
  }

  async pickLanguage(lang: string) {
    await this.langCheckbox(lang).click();
  }

  async verifyPickLanguage(lang: string) {
    await expect(this.langText).toHaveText(lang, { ignoreCase: true });
  }

  async uploadCV(file: string) {
    await this.uploadCvBtn.setInputFiles(path.join(path.resolve(file)));
  }

  async verifyUploadedCV(text?: string) {
    await expect(this.uploadCvText).toBeVisible();
    if (text) await expect(this.uploadCvText).toHaveText(text);
  }

  async toggleSpeaksGerman() {
    await this.speaksGermanToggle.click();
  }

  async verifySpeaksGerman(text?: string) {
    if (text) {
      await expect(this.speaksGermanBool).toHaveText(text);
    } else {
      await expect(this.speaksGermanBool).toHaveText("");
    }
  }

  async pickPrimarySkill(skillName: string) {
    await this.primarySkill.click();
    await this.primarySkill.selectOption({ label: skillName });
  }

  async verifyPickedPrimarySkill(skillName: string) {
    await expect(this.primarySkillText).toHaveText(skillName);
  }

}
