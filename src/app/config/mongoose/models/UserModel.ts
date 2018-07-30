import * as mongoose from "mongoose";

import { Model } from "../Model";
import { userSchema } from "../schemas/UserSchema";

class UserModel extends Model {

  public getModelName(): string {
    return "user";
  }

  public getSchema(): mongoose.Schema {
    return userSchema;
  }
}

export default UserModel;
