import { Request } from "hapi";

class ContactsController {
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
