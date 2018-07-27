import { config } from "env-yaml";
config();

import { asValue } from "awilix";
import { Connection } from "mongoose";
import { Logger } from "winston";
import { container } from "./config/container";
import { ConnectionFactory } from "./config/mongoose/ConnectionFactory";
import { Server } from "./Server";

const initialize = async () => {
  const logger = container.resolve("logger") as Logger;

  try {
    const connectionFactory =  container.resolve("connectionFactory") as ConnectionFactory;
    const db =  await connectionFactory.createConnection();

    container.register("db", asValue(db));
    const server = container.resolve("server") as Server;

    const initializedServer = await server.init();

    const protocol = initializedServer.info.protocol;
    const host = initializedServer.info.host;
    const port = initializedServer.info.port;

    logger.info(`Server running at ${protocol}://${host}:${port}`);
  } catch (error) {
    logger.error(error);
  }
};

initialize();
