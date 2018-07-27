import * as mongoose from "mongoose";

import { Model } from "../Model";
import { ContactSchema } from "./ContactsSchema";

class ContactsModel extends Model {

  private schema: mongoose.Schema;

  public getModelName(): string {
    return "contact";
  }

  public getSchema(): mongoose.Schema {
    return ContactSchema;
  }
}

export default ContactsModel;
