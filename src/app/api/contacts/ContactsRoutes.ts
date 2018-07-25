import { ServerRoute } from "hapi";
import { ContactsController } from "./ContactsController";

const controller = new ContactsController();

export const routes: ServerRoute[] = [
  {
    handler: controller.getContacts,
    method: "GET",
    options: {
      tags: ["api"],
    },
    path: "/contacts",
  },
];
