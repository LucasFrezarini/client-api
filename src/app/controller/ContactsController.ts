import { Request, ResponseToolkit } from "hapi";
import { Logger } from "winston";
import { container } from "../config/container";
import { IContact } from "../interfaces/IContact";
import ContactsService from "../services/ContactsService";

class ContactsController {
  public async getContacts(req: Request, h: ResponseToolkit) {
    const logger = container.resolve("logger") as Logger;
    const credentials = req.auth.credentials as any;

    try {
      const userId = credentials.id;
      const service = container.resolve("contactsService") as ContactsService;

      const search = { deleted: false, userId };
      const contacts = await service.find(search);
      return h.response(contacts);
    } catch (error) {
      logger.error(error);
      return h.response(error);
    }
  }

  public async saveContact(req: Request, h: ResponseToolkit) {
    const payload = req.payload as any;
    const contact = payload.contact as IContact;
    const logger = container.resolve("logger") as Logger;

    const credentials = req.auth.credentials as any;

    try {
      const service = container.resolve("contactsService") as ContactsService;
      const userId = credentials.id;

      contact.userId = userId;

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

  public async deleteContact(req: Request, h: ResponseToolkit) {
    const logger = container.resolve("logger") as Logger;
    const service = container.resolve("contactsService") as ContactsService;

    const params = req.params as any;
    const id = params.id;

    try {
      const removedContact = await service.delete(id);
      return h.response({
        msg: "Contact removed successfully!",
        removedContact,
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
