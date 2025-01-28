import { expect } from "@playwright/test";
import { baseFixture } from "../../fixtures";
import type { VoteResponse } from "../../api/models";
import { randomBytes } from 'crypto';

const payload = {
  image_id: `${randomBytes(8).toString('hex')}`,
  sub_id: `VP-${randomBytes(8).toString('hex')}`,
  value: 1,
};

baseFixture.describe("API tests for Vote Service", async () => {
  baseFixture("should add positive vote", async ({ Api }) => {
    const response = await Api.vote.createVote({ ...payload });

    expect(response).toMatchObject({
      ...payload,
      message: "SUCCESS",
    });
  });

  baseFixture("should add negatvie vote", async ({ Api }) => {
    const response = await Api.vote.createVote({ ...payload, value: -1 });

    expect(response).toMatchObject({
      ...payload,
      message: "SUCCESS",
      value: -1,
    });
  });

  baseFixture(
    "should not let post data without required field 'image_id'",
    async ({ Api }) => {
      try {
        await Api.vote.createVote({ random: "asd" });
      } catch (error) {
        const typedError = error as Error;
        expect(typedError.message).toContain('"image_id" is required');
      }
    }
  );

  baseFixture(
    "should not let post data with 'image_id' as boolean",
    async ({ Api }) => {
      try {
        await Api.vote.createVote({ image_id: false });
      } catch (error) {
        const typedError = error as Error;
        expect(typedError.message).toContain('"image_id" must be a string');
      }
    }
  );

  baseFixture(
    "should not let post data with 'image_id' as number",
    async ({ Api }) => {
      try {
        await Api.vote.createVote({ image_id: 2 });
      } catch (error) {
        const typedError = error as Error;
        expect(typedError.message).toContain('"image_id" must be a string');
      }
    }
  );

  baseFixture("should post and get vote by sub_id", async ({ Api }) => {
    const payload = {
      image_id: "9tbf8932vdz6y",
      sub_id: "777auto",
      value: "rand0m value",
    };

    await Api.vote.createVote(payload);
    const vote = await Api.vote.getVote("777auto") as VoteResponse[];
    const filteredSubIds = vote.map((obj) => obj.sub_id);
    expect(filteredSubIds.every(obj => obj == payload.sub_id)).toBeTruthy();
  });
});
