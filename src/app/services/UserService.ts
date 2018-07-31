import * as bcrypt from "bcrypt";
import { Connection } from "mongoose";
import { Logger } from "winston";
import { IUser } from "../interfaces/IUser";

class UserService {
  private db: Connection;
  private logger: Logger;

  constructor({db, logger}) {
    this.db = db;
    this.logger = logger;
  }

  public async create(user: IUser): Promise<any> {
    const salt = await bcrypt.genSalt(10);

    const userWithSaltPassword = {
      ...user,
      password: await bcrypt.hash(user.password, salt),
    };

    return this.db.model("user").create(userWithSaltPassword) as any;
  }

  public findById(id: string) {
    return this.db.model("user").findById(id);
  }
}

export default UserService;
