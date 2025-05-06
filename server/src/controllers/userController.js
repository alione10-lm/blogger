import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import Comment from "../models/Comment.js";
import Blog from "../models/Blog.js";
import { NotFoundError } from "../middlewares/errorsHandler.js";

export const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user.userId).populate({
    path: "blogs",
    populate: [
      { path: "createdBy" },
      {
        path: "comments",
        populate: [
          {
            path: "createdBy",
            model: "User",
          },
          {
            path: "replies",
            populate: {
              path: "createdBy",
              model: "User",
            },
          },
        ],
      },
      { path: "likes" },
    ],
  });

  res.status(StatusCodes.OK).json({ user });
};

export const updateUser = async (req, res) => {
  console.log(req.file);
  console.log(req.body);
  if (req.file) {
    req.body.avatar = req.file.filename;
  }
  const updatedUser = await User.findOneAndUpdate(
    { _id: req.user.userId },
    req.body,
    { new: true }
  );

  res.status(StatusCodes.OK).json({ updatedUser });
};

export const deleteUser = async (req, res) => {
  const comments = await Comment.find({ createdBy: req.user.userId });

  await Comment.updateMany(
    {
      replies: {
        $elemMatch: {
          createdBy: req.user.userId,
        },
      },
    },
    { $pull: { replies: { createdBy: req.user.userId } } },
    { new: true }
  );
  await Blog.updateMany(
    {
      likes: {
        $elemMatch: {
          createdBy: req.user.userId,
        },
      },
    },
    { $pull: { likes: { createdBy: req.user.userId } } },
    { new: true }
  );

  await Blog.deleteMany({ createdBy: req.user.userId });

  res
    .status(StatusCodes.OK)
    .json({ message: "delete", replies, comments, blogs });
};

export const getAllUser = async (req, res) => {
  const users = await User.find();
  res.status(StatusCodes.OK).json(users);
};
export const getSingleUser = async (req, res) => {
  const user = await User.find(req.params.userId);
  if (!user) throw NotFoundError("user not found");
  res.status(StatusCodes.OK).json(user);
};
