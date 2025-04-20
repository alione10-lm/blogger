import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../Errors/errors.js";
import User from "../models/User.js";
import { comparePassword, hashPassword } from "../utils/hashUtils.js";

const register = async (req, res) => {
  req.body.password = await hashPassword(req.body.password);
  const newUser = await User.create(req.body);

  // res.status(StatusCodes.CREATED).json({ message: newUser });
  res.status(StatusCodes.CREATED).json({ newUser });
};

const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));
  if (!isValidUser) throw new UnauthenticatedError("invalid credentials");

  res.status(StatusCodes.OK).json({ message: "logged in" });
};

export { register, login };
