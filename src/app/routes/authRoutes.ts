import * as Joi from "joi";

import { ServerRoute } from "hapi";
import { AuthController } from "../controller/AuthController";

const controller = new AuthController();

const authRoutes = (): ServerRoute[] => {
  return [
    {
      handler: controller.auth,
      method: "POST",
      options: {
        tags: ["api", "auth"],
        validate: {
          payload: {
            user: Joi.object({
              password: Joi.string().required(),
              username: Joi.string().required(),
            }).required(),
          },
        },
      },
      path: "/api/auth",
    },
  ];
};

export default authRoutes;
