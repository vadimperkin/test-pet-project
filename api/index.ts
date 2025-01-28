import { Base } from "./abstract";
import { CatController } from "./controllers/catController";
import { VoteController } from "./controllers/voteController";

export class API extends Base {
    public readonly cat = new CatController(this.request);
    public readonly vote = new VoteController(this.request);
}