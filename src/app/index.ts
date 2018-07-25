import { config } from "env-yaml";
config();

import { Logger } from "winston";
import { container } from "./config/container";
import { Server } from "./Server";

const initialize = async () => {

  const server = container.resolve("server") as Server;
  const logger = container.resolve("logger") as Logger;

  try {
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
