import { Request } from "hapi";
import { Controller } from "../Controller";

class ContactsController extends Controller {
  public async getContacts(req: Request) {
    return [
      {
        id: 1,
        name: "lucas",
      },
      {
        id: 2,
        name: "frezarini",
      }];
  }
}

export { ContactsController };
