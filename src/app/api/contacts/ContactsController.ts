import { Request } from "hapi";
import { Logger } from "winston";
import { container } from "../../config/container";
import ContactsService from "./ContactsService";

class ContactsController {
  public async getContacts(req: Request) {
    const logger = container.resolve("logger") as Logger;
    const contactsService = container.resolve("contactsService") as ContactsService;

    try {
      const contacts = await contactsService.findAll();
      return contacts;
    } catch (error) {
      logger.error(error);
    }
  }
}

export { ContactsController };
