import { PageHolder } from "./abstract";
import { Auth } from "../app/page/auth.page"
import { Form } from "../app/page/form.page"
import { WaitCondition } from "../app/page/waitCondition.page";
import { OrderSubmit } from "./page/orderSubmit";

export class Application extends PageHolder {
    public auth = new Auth(this.page);
    public form = new Form(this.page);
    public waitCondition = new WaitCondition(this.page);
    public orderSubmit = new OrderSubmit(this.page);
}