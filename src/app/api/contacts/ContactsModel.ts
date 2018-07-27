import * as mongoose from "mongoose";

import { Model } from "../Model";
import { ContactSchema } from "./ContactsSchema";

export interface IContact {
  firstName: string;
  lastName: string;
  email: string;
  deleted?: boolean;
  phones?: IPhones;
}

export interface IPhones {
  number: number;
  sort: string;
}

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
