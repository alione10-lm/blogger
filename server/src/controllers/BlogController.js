import { BadRequestError, NotFoundError } from "../Errors/errors.js";
import Blog from "../models/Blog.js";
import statusCodes, { StatusCodes } from "http-status-codes";

const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find().populate("likes");

  res.status(statusCodes.OK).json({ blogs });
};

const createBlog = async (req, res) => {
  const newBlog = await Blog.create(req.body);

  res.status(statusCodes.CREATED).json({ newBlog });
};
const deleteBlog = async (req, res) => {
  const removedBlog = await Blog.findByIdAndDelete(req.params.id);
  res.status(statusCodes.OK).json({ removedBlog });
};
const updateBlog = async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(statusCodes.OK).json({ updatedBlog });
};
const getSingleBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (!blog) throw new NotFoundError("not found");

  console.log(blog.likes.length);
  res.status(statusCodes.OK).json({ blog });
};

// const likeBlog = async (req, res) => {
//   const { userId, blogId } = req.body;

//   const hasLiked = await Like.findOne({ blogId, userId });

//   let blog;

//   if (hasLiked) {
//     await Like.deleteOne({ _id: hasLiked._id });

//     blog = await Blog.findOneAndUpdate(
//       { _id: hasLiked.blogId },
//       {
//         $pull: { likes: hasLiked._id },
//       },
//       {
//         new: true,
//       }
//     );
//     console.log(hasLiked, blog);
//   } else {
//     const newLike = await Like.create({
//       userId,
//       blogId,
//     });

//     blog = await Blog.findByIdAndUpdate(
//       blogId,
//       {
//         $push: { likes: newLike._id },
//       },
//       { new: true }
//     );
//     console.log("just liked !");
//   }

//   res.status(200).json({ blog });
// };

const likeBlog = async (req, res) => {
  const { userId, blogId } = req.body;

  const hasLiked = await Blog.findOne({
    likes: {
      $elemMatch: {
        userId,
        blogId,
      },
    },
  });

  console.log(hasLiked);

  let blog;

  if (hasLiked) {
    blog = await Blog.findOneAndUpdate(
      { _id: blogId },
      {
        $pull: { likes: { userId, blogId } },
      },
      {
        new: true,
      }
    );
  } else {
    blog = await Blog.findByIdAndUpdate(
      { _id: blogId },
      {
        $push: { likes: { userId, blogId } },
      },
      { new: true }
    );
    console.log("just liked !");
  }

  res.status(200).json({ blog });
};
export {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  getSingleBlog,
  likeBlog,
};
