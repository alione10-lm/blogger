import Comment from "../models/Comment.js";
import { StatusCodes } from "http-status-codes";
import Blog from "../models/Blog.js";

const createComment = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const newComment = await Comment.create(req.body);

  const blog = await Blog.findOneAndUpdate(
    { _id: req.body.blogId },
    {
      $push: { comments: newComment._id },
    },
    {
      new: true,
    }
  );
  res.status(StatusCodes.CREATED).json({ blog });
};

const deleteComment = async (req, res) => {
  const { id } = req.params;
  const deletedComment = await Comment.findOneAndDelete({ _id: id });

  const blog = await Blog.findOneAndUpdate(
    {
      comments: id,
    },
    {
      $pull: {
        comments: id,
      },
    },
    {
      new: true,
    }
  );

  res.status(StatusCodes.OK).json({ deletedComment, blog });
};

const updateComment = async (req, res) => {
  const { id } = req.params;

  const updatedComment = await Comment.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });

  res.status(StatusCodes.OK).json({ updatedComment });
};

const createReply = async (req, res) => {
  // const comment = await Comment.findOne(req.body.id);
  req.body.createdBy = req.user.userId;

  const { replyTo, text, createdBy } = req.body;

  const comment = await Comment.findOneAndUpdate(
    { _id: replyTo },
    { $push: { replies: { text, replyTo, createdBy } } },
    {
      new: true,
    }
  );

  res.status(StatusCodes.CREATED).json({ comment });
};

const deleteReply = async (req, res) => {
  const { id } = req.params;

  const reply = await Comment.findOneAndUpdate(
    {
      replies: {
        $elemMatch: {
          _id: id,
        },
      },
    },
    {
      $pull: { replies: { _id: id } },
    },
    { new: true }
  );

  res.status(StatusCodes.OK).json({ reply });
};
export {
  createComment,
  deleteComment,
  updateComment,
  createReply,
  deleteReply,
};
