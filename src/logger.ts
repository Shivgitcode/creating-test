import winston, { format, transports } from "winston";

export const logger = winston.createLogger({
  level: "info",
  format: format.combine(
    format.colorize({ all: true }),
    format.cli(),
    format.timestamp()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "myLogs" }),
  ],
});
