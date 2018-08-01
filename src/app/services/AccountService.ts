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

      const userDbData = await this.userService.findOne(search, fields) as any;

      if (!userDbData) {
        return this.loginResponseHandler("Invalid username");
      }

      const isPasswordCorrect = await bcrypt.compare(user.password, userDbData.password);

      if (!isPasswordCorrect) {
        return this.loginResponseHandler("Invalid password");
      }

      const dataToSign = {
        id: userDbData._id,
        username: userDbData.username,
      };

      const token = await this.authService.generateToken(dataToSign);

      return this.loginResponseHandler("Authenticated", true, token);
    } catch (error) {
      console.log(error);
    }
  }

  private loginResponseHandler(msg: string, success: boolean = false, token?: string) {
    const response: any = { msg, success };

    if (token) {
      response.token = token;
    }

    return response;
  }
}

export default AccountService;
