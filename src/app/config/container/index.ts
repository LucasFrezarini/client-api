import * as awilix from "awilix";

import * as path from "path";

import { PluginProvider } from "../../plugins/PluginProvider";
import { Server } from "../../Server";
import { LoggerFactory } from "../../utils/LoggerFactory";
import { ConnectionFactory } from "../mongoose/ConnectionFactory";
import { routesContainer } from "../routes";

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

container.loadModules([
  path.join(__dirname, "../../", "config/mongoose/**/*.js"),
  path.join(__dirname, "../../", "services/**/*.js"),
], {
  formatName: "camelCase",
  resolverOptions: {
    injectionMode: awilix.InjectionMode.PROXY,
    lifetime: awilix.Lifetime.SINGLETON,
  },
});

const models = [
  container.resolve("contactsModel"),
];

container.register("models", awilix.asValue(models));

container.register({
  connectionFactory: awilix.asClass(ConnectionFactory).singleton(),
  logger: awilix.asFunction(new LoggerFactory().createLogger).singleton(),
  plugins: awilix.asFunction(new PluginProvider().getPlugins).singleton(),
  routes: awilix.asValue(routesContainer),
  server: awilix.asClass(Server).singleton(),
});

export { container };
