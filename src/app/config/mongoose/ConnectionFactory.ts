import * as mongoose from "mongoose";

import { Logger } from "winston";

class ConnectionFactory {
  private database = process.env.DB_DATABASE;
  private host = process.env.DB_HOST;
  private password = process.env.DB_PASSWORD;
  private port = process.env.DB_PORT;
  private user = process.env.DB_USER;

  private logger: Logger;

  constructor({ logger }) {
    this.logger = logger;
  }

  public async createConnection() {
    this.logger.info("Connecting to MongoDB...");

    const uri = this.getUri();
    const db  = mongoose.connection;

    mongoose.connect(uri, {
      useNewUrlParser: true,
    });

    return new Promise((resolve, reject) => {
      db.on("error", (error) => {
        this.logger.error(`Error while trying to connect to the database: ${error.toString()}`);
        reject(error);
      });

      db.once("open", () => {
        this.logger.info(`Connected to the MongoDB instance: ${this.host}:${this.port} (database: ${this.database}).`);
        resolve(db);
      });
    });
  }

  public getUri() {
    if (this.user) {
      return `mongodb://${this.user}:${this.password}@${this.host}:${this.port}/${this.database}`;
    }

    return `mongodb://${this.host}:${this.port}/${this.database}`;
  }
}

export { ConnectionFactory };
