import * as Hapi from "hapi";
import { Logger } from "winston";
import { IPlugin } from "./plugins";

export class Server {
  private port = process.env.SERVER_PORT;
  private host = process.env.SERVER_HOST;

  private logger: Logger;
  private plugins: IPlugin[];

  constructor({ logger, plugins }) {
    this.logger = logger;
    this.plugins = plugins;
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
      await this.registerPlugins(serverInstance);
      await serverInstance.start();
      return serverInstance;
    } catch (error) {
      this.logger.error(`Error at starting the server: ${error.toString()}`);
      throw new Error(`Error at starting the server: ${error}`);
    }
  }

  public async registerPlugins(serverInstance: Hapi.Server) {
    /* Map all plugins to register promises and execute them concurrently */
    await Promise.all(
      this.plugins.map(this.registerPlugin.bind(this, serverInstance)),
    );
  }

  private async registerPlugin(serverInstance: Hapi.Server, plugin: IPlugin) {
    this.logger.debug(`Registering plugin ${plugin.getName()}`);
    await serverInstance.register(plugin.getConfiguration());
    this.logger.debug(`Done registering plugin ${plugin.getName()}`);
  }
}
