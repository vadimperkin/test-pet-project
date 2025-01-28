import { Base } from "../abstract";
import type { PossibleVotePayload, VoteResponse } from "../models";

export class VoteController extends Base {
  /**
   * Create vote.
   * @param data {VotePayload} vote description in json
   * @returns single vote
   */
  async createVote(data: PossibleVotePayload): Promise<VoteResponse> {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY is not defined!");
    }
    try {
      const response = await this.request.post(
        `https://api.thecatapi.com/v1/votes`,
        {
          data,
          headers: {
            "x-api-key": process.env.API_KEY,
          },
        }
      );

      if (!response.ok()) {
        const contentType = response.headers()["content-type"];
        const errorMessage =
          contentType && contentType.includes("application/json")
            ? await response.json()
            : await response.text();
        throw new Error(errorMessage);
      }
      return response.json() as Promise<VoteResponse>;
    } catch (error) {
      throw new Error(`Failed to create vote: ${(error as Error).message}`);
    }
  }

  /**
   * Get vote
   * @param data {VotePayload} vote description in json
   * @returns single vote
   */
  async getVote(sub_id?: string): Promise<VoteResponse | VoteResponse[]> {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY is not defined!");
    }
    const params = new URLSearchParams();
    if (sub_id) params.append("sub_id", sub_id);

    try {
      const response = await this.request.get(
        `https://api.thecatapi.com/v1/votes?${params.toString()}`,
        {
          headers: {
            "x-api-key": process.env.API_KEY,
          },
        }
      );
      return response.json() as Promise<VoteResponse>;
    } catch (error) {
      throw new Error(
        `Error in GET /v1/votes?${params.toString()} - ${
          (error as Error).message
        }`
      );
    }
  }
}
