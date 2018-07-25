import { ServerRegisterPluginObject } from "hapi";
import * as inert from "inert";
import { IPlugin } from "../IPlugin";

class InertPlugin implements IPlugin {
  public getConfiguration(): ServerRegisterPluginObject<any> {
    return {
      plugin: inert,
    };
  }

  public getName(): string {
    return "inert";
  }

}

export { InertPlugin };
