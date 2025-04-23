import { body, param, validationResult } from "express-validator";

import mongoose from "mongoose";
import { BadRequestError } from "../middlewares/errorsHandler.js";
import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";

const validationMessages = (fields) => {
  return [
    fields,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        throw new BadRequestError(errorMessages);
      }

      next();
    },
  ];
};

export const validateBlogInputs = validationMessages([
  body("title").notEmpty().withMessage("title is required"),
  body("description").notEmpty().withMessage("description is required"),
]);

export const validateLoginInputs = validationMessages([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters"),
]);

export const validateRegisterInputs = validationMessages([
  body("firstName").notEmpty().withMessage("firstName is required"),
  body("lastName").notEmpty().withMessage("lastName is required"),
  body("gender").notEmpty().withMessage("gender is required"),
  body("email")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("email already in use");
      }
    }),

  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters"),
]);

export const validateCommentInput = validationMessages([
  body("text").notEmpty().withMessage("comment must be at least 1 charactere"),
]);
