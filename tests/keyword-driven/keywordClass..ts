import { Page } from "@playwright/test";
import { Auth } from "../../app/page/auth.page";

export type Keyword = keyof ReturnType<KeywordAction["getKeywords"]>;
export type KeywordArgs = {
  OpenUrl: [string?];
  Login: [string, string];
  VerifyFailedLogin: [];
};

export class KeywordAction extends Auth {
  getKeywords() {
    return {
      OpenUrl: (path?: string) => this.open(path),
      Login: (username: string, password: string) =>
        this.login(username, password),
      VerifyFailedLogin: () => this.expectLoginFailed(),
    };
  }
}

export class TestRunner {
  private keywords: ReturnType<KeywordAction["getKeywords"]>;
  constructor(page: Page) {
    const keywordActions = new KeywordAction(page);
    this.keywords = keywordActions.getKeywords();
  }

  async runTests<T extends Keyword>(
    steps: Array<{ key: T; params: KeywordArgs[T] }>
  ) {
    for (const step of steps) {
      const { key, params } = step;

      const keywordAction = this.keywords[key] as (
        ...args: KeywordArgs[T]
      ) => Promise<void>;
      if (keywordAction) {
        await keywordAction(...(params));
      } else {
        throw new Error(`Unknown action: ${key}`);
      }
    }
  }
}
