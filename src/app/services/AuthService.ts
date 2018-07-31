import * as bcrypt from "bcrypt";
import { Connection } from "mongoose";
import { Logger } from "winston";
import { IUser } from "../interfaces/IUser";

class AuthService {
  private db: Connection;
  private logger: Logger;

  constructor({db, logger}) {
    this.db = db;
    this.logger = logger;
  }

  public async validate(decoded, request): Promise<any> {
    if (!decoded.id) {
      return { isValid: false};
    }

    const user = await this.db.model("user").findById(decoded.id);

    if (!user) {
      return { isValid: false };
    }

    return { isValid: true};
  }
}

export default AuthService;
