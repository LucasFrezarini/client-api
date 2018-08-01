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
        tags: ["api", "contact"],
      },
      path: "/api/contacts",
    },
    {
      handler: controller.saveContact,
      method: "POST",
      options: {
        tags: ["api", "contact"],
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
      path: "/api/contacts",
    },
    {
      handler: controller.updateContact,
      method: "PATCH",
      options: {
        tags: ["api", "contact"],
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
      path: "/api/contacts/{id}",
    },
    {
      handler: controller.deleteContact,
      method: "DELETE",
      options: {
        tags: ["api", "contact"],
        validate: {
          params: {
            id: Joi.string().required(),
          },
        },
      },
      path: "/api/contacts/{id}",
    },
  ];
};

export default contactsRoutes;
