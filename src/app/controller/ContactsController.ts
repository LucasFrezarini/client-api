import { Request, ResponseToolkit } from "hapi";
import { Logger } from "winston";
import { container } from "../config/container";
import { IContact } from "../interfaces/IContact";
import ContactsService from "../services/ContactsService";

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

  public async updateContact(req: Request, h: ResponseToolkit) {
    const logger = container.resolve("logger") as Logger;
    const service = container.resolve("contactsService") as ContactsService;

    const params = req.params as any;
    const id = params.id;

    const payload = req.payload as any;
    const contact = payload.contact as IContact;

    try {
      const updatedContact = await service.update(id, contact);
      return h.response({
        msg: "Contact updated successfully!",
        updatedContact,
      });
    } catch (error) {
      logger.error(error);
      return h.response({
        msg: "An internal server error occurred.",
      }).code(500);
    }
  }
}

export { ContactsController };
