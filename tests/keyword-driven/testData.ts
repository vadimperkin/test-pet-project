import type { Keyword } from "./keywordClass.";
import type { KeywordArgs } from "./keywordClass.";

export const testData: Array<{ key: Keyword; params: KeywordArgs[Keyword] }> = [
  { key: "OpenUrl", params: ["/login.html"] },
  { key: "Login", params: ["admin", "admin"] },
  { key: "OpenUrl", params: ["/login.html"] },
  { key: "Login", params: ["qwerty", "12345"] },
  { key: "VerifyFailedLogin", params: [] },
];
