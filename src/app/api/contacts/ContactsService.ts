import { Connection } from "mongoose";
import { Logger } from "winston";

class ContactsService {

  private db: Connection;
  private logger: Logger;

  constructor({ db, logger }) {
    this.logger = logger;
    this.db = db;
  }

  public async findAll() {
    return this.db.model("contact").find();
  }
}

export default ContactsService;
