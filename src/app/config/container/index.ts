import * as awilix from "awilix";

import { PluginProvider } from "../../plugins/PluginProvider";
import { Server } from "../../Server";
import { LoggerFactory } from "../../utils/LoggerFactory";
import { routesContainer } from "../routes";

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
  logger: awilix.asFunction(new LoggerFactory().createLogger).singleton(),
  plugins: awilix.asFunction(new PluginProvider().getPlugins).singleton(),
  routes: awilix.asValue(routesContainer),
  server: awilix.asClass(Server).singleton(),
});

export { container };
