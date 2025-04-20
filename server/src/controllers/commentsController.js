import Comment from "../models/Comment.js";
import { StatusCodes } from "http-status-codes";

const createComment = async (req, res) => {
  console.log(req.body);
  const newComment = await Comment.create(req.body);

  res.status(StatusCodes.CREATED).json({ newComment });
};

const deleteComment = async (req, res) => {
  console.log("hello");
  console.log(req.body.id);
  const { id } = req.body;
  const deletedComment = await Comment.findOneAndDelete(id);
  res.status(StatusCodes.OK).json({ deletedComment });
};

const updateComment = async (req, res) => {
  const { id } = req.body;

  const updatedComment = await Comment.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });

  res.status(StatusCodes.OK).json({ updatedComment });
};

export { createComment, deleteComment, updateComment };
