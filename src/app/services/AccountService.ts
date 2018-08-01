import * as bcrypt from "bcrypt";
import { Logger } from "winston";
import { IUser } from "../interfaces/IUser";
import AuthService from "./AuthService";
import UserService from "./UserService";

class AccountService {
  private authService: AuthService;
  private logger: Logger;
  private userService: UserService;

  constructor({ authService, logger, userService}) {
    this.authService = authService;
    this.logger = logger;
    this.userService = userService;
  }

  public async login(user: IUser) {
    try {
      const search = { username: user.username };
      const fields = ["_id", "username", "password"];

      const userData = await this.userService.find(search, fields) as any;

      const dataToSign = {
        id: userData._id,
        username: userData.username,
      };

      return this.authService.generateToken(dataToSign);
    } catch (error) {
      console.log(error);
    }
  }
}

export default AccountService;
