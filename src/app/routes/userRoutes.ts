import * as Joi from "joi";

import { ServerRoute } from "hapi";
import { UserController } from "../controller/UserController";

const controller = new UserController();

const contactsRoutes = (): ServerRoute[] => {
  return [
    {
      handler: controller.createUser,
      method: "POST",
      options: {
        auth: false,
        tags: ["api", "user"],
        validate: {
          payload: {
            user: Joi.object({
              password: Joi.string().required(),
              username: Joi.string().required(),
            }).required(),
          },
        },
      },
      path: "/api/user",
    },
  ];
};

export default contactsRoutes;
