import { Request, ResponseToolkit } from "hapi";
import { Logger } from "winston";
import { container } from "../../config/container";
import { IContact } from "./ContactsModel";
import ContactsService from "./ContactsService";

class ContactsController {
  public async getContacts(req: Request) {
    const logger = container.resolve("logger") as Logger;

    try {
      const service = container.resolve("contactsService") as ContactsService;
      const contacts = await service.findAll();
      return contacts;
    } catch (error) {
      logger.error(error);
    }
  }

  public async saveContact(req: Request, h: ResponseToolkit) {
    const payload = req.payload as any;
    const contact = payload.contact as IContact;
    const logger = container.resolve("logger") as Logger;

    try {
      const service = container.resolve("contactsService") as ContactsService;
      const createdContact = await service.create(contact);
      return h.response({
        msg: "Contact registered successfully!",
        payload: {
          contact: createdContact,
        },
      }).code(201);
    } catch (error) {
      logger.error(error);
      return h.response({
        msg: "An internal server error occurred.",
      }).code(500);
    }
  }
}

export { ContactsController };
