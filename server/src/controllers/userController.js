import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import Comment from "../models/Comment.js";
import Blog from "../models/Blog.js";
import { NotFoundError } from "../middlewares/errorsHandler.js";
import { promises as fs } from "fs";
import cloudinary from "cloudinary";

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
  const newUser = { ...req.body };

  if (req.file) {
    // we are trying to upload the new image that comes from req.file.path ;
    const response = await cloudinary.v2.uploader.upload(req.file.path);

    // we are trying to remove it from public folder
    await fs.unlink(req.file.path);

    // we are trying to store the avatar image url and id using the new ones wich come from the cloudinary database and store in the newUser object wich we are going to send in the response

    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }

  const user = await User.findByIdAndUpdate(req.user.userId, newUser);

  // here we are checking if the user has already an image  , if this is true we should remove the id of the old one
  if (req.file && user.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(user.avatarPublicId);
  }

  res.status(StatusCodes.OK).json({ user });
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

  res.status(StatusCodes.OK).json({ message: "delete" });
};

export const getAllUser = async (req, res) => {
  const users = await User.find();
  res.status(StatusCodes.OK).json(users);
};
export const getSingleUser = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId).populate({
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
  if (!user) throw NotFoundError("user not found");
  res.status(StatusCodes.OK).json({ user });
};
