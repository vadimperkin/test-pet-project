import { APIRequestContext } from "@playwright/test";

export abstract class Base {
  constructor(protected request: APIRequestContext) {}
}