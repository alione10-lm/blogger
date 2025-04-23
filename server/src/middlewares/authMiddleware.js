import jwt from "jsonwebtoken";
import { ENV } from "../config/dotenv.js";
import { UnauthenticatedError } from "../middlewares/errorsHandler.js";

export const createJWT = (paylaod) => {
  return jwt.sign(paylaod, ENV.TOKEN_SECRET);
};

export const verfiyJWT = (token) => {
  return jwt.verify(token, ENV.TOKEN_SECRET);
};

export const authMiddleware = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("not authenticated");
  try {
    const { userId } = verfiyJWT(token);
    req.user = { userId };
    next();
  } catch (error) {
    throw new UnauthenticatedError("not authenticated");
  }
};
