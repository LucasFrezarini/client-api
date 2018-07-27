import * as Joi from "joi";

import { ServerRoute } from "hapi";
import { ContactsController } from "../controller/ContactsController";

const controller = new ContactsController();

const contactsRoutes = (): ServerRoute[] => {
  return [
    {
      handler: controller.getContacts,
      method: "GET",
      options: {
        tags: ["api"],
      },
      path: "/contacts",
    },
    {
      handler: controller.saveContact,
      method: "POST",
      options: {
        tags: ["api"],
        validate: {
          payload: {
            contact: Joi.object({
              email: Joi.string().required(),
              firstName: Joi.string().required(),
              lastName: Joi.string().required(),
              phones: Joi.array().items(Joi.object({
                number: Joi.number().required(),
                sort: Joi.string().default("residential"),
              })),
            }).required(),
          },
        },
      },
      path: "/contacts",
    },
    {
      handler: controller.updateContact,
      method: "PATCH",
      options: {
        tags: ["api"],
        validate: {
          params: {
            id: Joi.string().required(),
          },
          payload: {
            contact: Joi.object({
              email: Joi.string().optional(),
              firstName: Joi.string().optional(),
              lastName: Joi.string().optional(),
              phones: Joi.array().items(Joi.object({
                number: Joi.number().required(),
                sort: Joi.string().default("residential"),
              })),
            }).required(),
          },
        },
      },
      path: "/contacts/{id}",
    },
  ];
};

export default contactsRoutes;
