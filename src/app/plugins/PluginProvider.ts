import {
  InertPlugin,
  SwaggerPlugin,
  VisionPlugin,
} from "./index";

import { IPlugin } from "./IPlugin";

class PluginProvider {

  /* Register plugins here */
  public getPlugins(): IPlugin[] {
    return [
      new InertPlugin(),
      new SwaggerPlugin(),
      new VisionPlugin(),
    ];
  }
}

export { PluginProvider };
