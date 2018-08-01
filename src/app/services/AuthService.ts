import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Connection } from "mongoose";
import { Logger } from "winston";
import { IUser } from "../interfaces/IUser";
import UserService from "./UserService";

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

  public async generateToken(data, expiresIn?) {
    return new Promise<string>((resolve, reject) => {
      const options: any = {
        algorithm: "HS256",
      };

      if (expiresIn) {
        options.expiresIn = expiresIn;
      }

      jwt.sign(data, process.env.SECRET_KEY, options, (err, token) => {
        if (err) {
          reject(err);
        }

        resolve(token);
      });
    });
  }
}

export default AuthService;
