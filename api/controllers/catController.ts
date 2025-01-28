import { Base } from "../abstract";
import type { CatBreeds } from "../models";

export class CatController extends Base {
  /**
   * Get cats by breed.
   * @param breed {String} breed you want to find
   * @returns array of breeds objects
   */
  async getCats(breed: string, limit: number): Promise<CatBreeds | null> {
    try {
      const response = await this.request.get(
        `https://api.thecatapi.com/v1/images/search?limit=${limit}&breed_ids=${breed}&api_key=${process.env.API_KEY}`
      );
      return response.json() as Promise<CatBreeds>;
    } catch (error) {
      console.log(`Error in GET /v1/images?breed_ids=${breed} - ${error}!`);
      return null;
    }
  }
}
