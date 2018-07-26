import * as awilix from "awilix";

import { PluginProvider } from "../../plugins/PluginProvider";
import { Server } from "../../Server";
import { LoggerFactory } from "../../utils/LoggerFactory";
import { ConnectionFactory } from "../mongoose/ConnectionFactory";
import { routesContainer } from "../routes";

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
  connectionFactory: awilix.asClass(ConnectionFactory).singleton(),
  logger: awilix.asFunction(new LoggerFactory().createLogger).singleton(),
  plugins: awilix.asFunction(new PluginProvider().getPlugins).singleton(),
  routes: awilix.asValue(routesContainer),
  server: awilix.asClass(Server).singleton(),
});

const connectionFactory = container.resolve<ConnectionFactory>("connectionFactory");

container.register({
  connection: awilix.asValue(connectionFactory.createConnection()),
});

export { container };
