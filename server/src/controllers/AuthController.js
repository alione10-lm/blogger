import { StatusCodes } from "http-status-codes";
import { UnauthenticatedError } from "../middlewares/errorsHandler.js";
import User from "../models/User.js";
import { comparePassword, hashPassword } from "../utils/hashUtils.js";
import { createJWT } from "../middlewares/authMiddleware.js";
import { logger } from "../utils/logger.js";

export const register = async (req, res) => {
  req.body.password = await hashPassword(req.body.password);
  const newUser = await User.create(req.body);

  logger.info(`${newUser} registred `);
  // res.status(StatusCodes.CREATED).json({ message: newUser });
  res.status(StatusCodes.CREATED).json({ newUser });
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));

  if (!isValidUser) throw new UnauthenticatedError("invalid credentials");

  const token = createJWT({ userId: user._id });

  const day = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + day),
    secure: process.env.NODE_ENV === "production",
  });
  logger.info(`${user} logged in `);

  res.status(StatusCodes.OK).json({ message: "logged in", token, user });
};

export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: "user logged out !" });
};
