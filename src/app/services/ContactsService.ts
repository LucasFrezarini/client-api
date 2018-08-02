import { Connection, Model } from "mongoose";
import { Logger } from "winston";
import { IContact } from "../interfaces/IContact";

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

  public find(criteria: object, fields?: string[], options?: object) {
    return this.db.model("contact").find(criteria, fields, options);
  }

  public create(contact: IContact) {
    return this.db.model("contact").create(contact);
  }

  public update(id: any, data: IContact) {
    return this.db.model("contact").findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  public delete(id: any) {
    return this.db.model("contact").findByIdAndUpdate(id, {
      deleted: true,
    }, { new: true });
  }
}

export default ContactsService;
