import { ServerRegisterPluginObject } from "hapi";
import * as hapiAuthJwt2 from "hapi-auth-jwt2";
import { IPlugin } from "../IPlugin";

class HapiAuthJwtPlugin implements IPlugin {
  public getConfiguration(): ServerRegisterPluginObject<any> {
    return {
      plugin: hapiAuthJwt2,
    };
  }

  public getName(): string {
    return "hapi-auth-jwt-2";
  }

}

export { HapiAuthJwtPlugin };
