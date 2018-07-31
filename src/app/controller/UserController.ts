import { Request, ResponseToolkit } from "hapi";
import { Logger } from "winston";
import { container } from "../config/container";
import { IUser } from "../interfaces/IUser";
import UserService from "../services/UserService";

class UserController {
  public async createUser(req: Request, h: ResponseToolkit) {
    const payload = req.payload as any;
    const user: IUser = payload.user;

    const userService = container.resolve("userService") as UserService;
    const logger = container.resolve("logger") as Logger;

    try {
      const createdUser = await userService.create(user);

      return h.response({
        msg: "User created successfully!",
        payload: {
          user: {
            createdAt: createdUser.createdAt,
            username: createdUser.username,
          },
        },
      });
    } catch (error) {
      logger.error(error);
      return h.response({
        msg: "An internal server error occurred.",
      }).code(500);
    }
  }
}

export { UserController };
