import { ServerRegisterPluginObject } from "hapi";
import * as swagger from "hapi-swagger";
import { IPlugin } from "../IPlugin";

class SwaggerPlugin implements IPlugin {
  public getConfiguration(): ServerRegisterPluginObject<any> {
    return {
      options: {
        documentationPath: "/api/docs",
        grouping: "tags",
        info: {
          description: "Contacts Api Documentation",
          title: "Contacts Api",
          version: "0.2.0",
        },
      },
      plugin: swagger,
    };
  }

  public getName(): string {
    return "swagger";
  }

}

export { SwaggerPlugin };
