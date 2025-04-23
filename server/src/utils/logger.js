// const { createLogger, format, transports } = require("winston");
import { createLogger, format, transports } from "winston";
const { combine, timestamp, printf, colorize } = format;

const customFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] [${level.toUpperCase()}]:${message}`;
});
export const logger = createLogger({
  level: "info",
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), customFormat),
  transports: [
    new transports.Console({
      format: combine(colorize(), customFormat),
    }),
    new transports.File({ filename: "logs/combined.log" }),
    // new transports.File({ filename: "logs/error.log" }),
  ],
});
if (process.env.NODE_ENV === "production") {
  logger.add(
    new transports.File({
      filename: "logs/productions.log",
      level: "info",
    }),
    new transports.File({
      filename: "logs/productions.log",
      level: "error",
    })
  );
}
export const requestLogger = (req, res, next) => {
  logger.info(`HTTP ${req.method} ${req.url} ${req.body ? req.body : ""}`);
  next();
};
