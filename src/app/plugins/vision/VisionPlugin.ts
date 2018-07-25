import { ServerRegisterPluginObject } from "hapi";
import * as vision from "vision";
import { IPlugin } from "../IPlugin";

class VisionPlugin implements IPlugin {
  public getConfiguration(): ServerRegisterPluginObject<any> {
    return {
      plugin: vision,
    };
  }

  public getName(): string {
    return "vision";
  }

}

export { VisionPlugin };
