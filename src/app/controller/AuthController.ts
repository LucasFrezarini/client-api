import { Request, ResponseToolkit } from "hapi";
import { Logger } from "winston";
import { container } from "../config/container";
import { IContact } from "../interfaces/IContact";
import { IUser } from "../interfaces/IUser";
import AccountService from "../services/AccountService";

class AuthController {

  public async auth(req: Request, h: ResponseToolkit) {
    const logger = container.resolve("logger") as Logger;
    const accountService = container.resolve("accountService") as AccountService;

    const payload = req.payload as any;
    const user = payload.user as IUser;

    try {
      const loginResponse = await accountService.login(user);

      if (loginResponse.success) {
        return h.response({
          msg: "Authenticated",
          payload: {
            token: loginResponse.token,
          },
        });
      }

      return h.response({
        msg: "Authentication Failed!",
      }).code(401);
    } catch (error) {
      logger.error(error);
      return h.response({
        msg: "An internal server error occurred",
      }).code(500);
    }
  }
}

export { AuthController };
