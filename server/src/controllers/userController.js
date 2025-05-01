import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import Comment from "../models/Comment.js";
import Blog from "../models/Blog.js";

export const getCurrentUser = async (req, res) => {
  const userBlogs = await Blog.find({ createdBy: req.user.userId });
  let user = await User.findById(req.user.userId);

  res.status(StatusCodes.OK).json({ user, userBlogs });
};

export const updateUser = async (req, res) => {
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
  const replies = await Comment.find({
    replies: {
      $elemMatch: {
        createdBy: req.user.userId,
      },
    },
  });

  const blogs = await Comment.find({ createdBy: req.user.userId });

  res
    .status(StatusCodes.OK)
    .json({ message: "delete", replies, comments, blogs });
};
