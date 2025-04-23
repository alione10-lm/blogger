import { StatusCodes } from "http-status-codes";

import { logger } from "../utils/logger.js";
const errorHandlerMiddleware = (err, req, res, next) => {
  const { statusCode } = err || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || "something went wrong , try again later !";
  logger.error(message);
  res.status(statusCode).json({ message });
};

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
export class UnauthenticatedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthenticatedError";
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
export class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthorizedError";
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

export default errorHandlerMiddleware;
