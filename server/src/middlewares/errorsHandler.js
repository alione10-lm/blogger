import { StatusCodes } from "http-status-codes";
import { logger } from "../utils/logger.js";
const errorHandlerMiddleware = (err, req, res, next) => {
  const { statusCode } = err || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = err.message || "something went wrong , try again later !";
  res.status(statusCode).json({ msg });
};

export default errorHandlerMiddleware;
