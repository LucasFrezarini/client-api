import { ServerRegisterPluginObject } from "hapi";

interface IPlugin {
  getConfiguration(): ServerRegisterPluginObject<any>;
  getName(): string;
}

export { IPlugin };
