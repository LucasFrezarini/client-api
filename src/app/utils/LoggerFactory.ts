import * as winston from "winston";

export class LoggerFactory {
  public createLogger() {
    const loggerInstance = winston.createLogger({
      exceptionHandlers: [
        new winston.transports.File({ filename: "log/exceptions.log"}),
      ],
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json(),
      ),
      level: "info",
      transports: [
        new winston.transports.File({ filename: "log/error.log"}),
        new winston.transports.File({ filename: "log/combined.log"}),
      ],
    });

    if (process.env.NODE_ENV !== "production") {
      loggerInstance.add(new winston.transports.Console({
        format: winston.format.simple(),
      }));
    }

    return loggerInstance;
  }
}
