import * as awilix from "awilix";

import { Server } from "../../Server";
import { LoggerFactory } from "../../utils/LoggerFactory";

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
  logger: awilix.asFunction(new LoggerFactory().createLogger).singleton(),
  server: awilix.asClass(Server),
});

export { container };
