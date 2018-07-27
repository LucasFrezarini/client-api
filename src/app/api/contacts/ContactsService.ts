import { Connection } from "mongoose";
import { Logger } from "winston";
import { IContact } from "./ContactsModel";

class ContactsService {

  private db: Connection;
  private logger: Logger;

  constructor({ db, logger }) {
    this.logger = logger;
    this.db = db;
  }

  public findAll() {
    return this.db.model("contact").find({deleted: false});
  }

  public create(contact: IContact) {
    return this.db.model("contact").create(contact);
  }
}

export default ContactsService;
