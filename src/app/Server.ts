import * as Hapi from "hapi";
import { Logger } from "winston";

export class Server {
  private port = process.env.SERVER_PORT;
  private host = process.env.SERVER_HOST;

  private logger: Logger;

  constructor({ logger }) {
    this.logger = logger;
  }

  public async init() {
    this.logger.log("info", "Starting server...");

    const serverInstance = new Hapi.Server({
      host: this.host,
      port: this.port,
    });

   // const routes = router.routes;

  //  this.logger.info("Loading routes...");
   // serverInstance.route(routes);
   // this.logger.info("Routes loaded successfully.");

    try {
    //  await provider.registerAll(serverInstance);
      await serverInstance.start();
      return serverInstance;
    } catch (error) {
      this.logger.error(`Error at starting the server: ${error.toString()}`);
      throw new Error(`Error at starting the server: ${error}`);
    }
  }
}
