import { NotFoundError } from "../middlewares/errorsHandler.js";
import Blog from "../models/Blog.js";
import statusCodes, { StatusCodes } from "http-status-codes";
import User from "../models/User.js";

const getAllBlogs = async (req, res) => {
  const { filter, search } = req.query;

  const queryObj = {};

  if (filter && filter !== "all") {
    queryObj.$or = [
      { title: { $regex: filter, $options: "i" } },
      { description: { $regex: filter, $options: "i" } },
    ];
  }
  // if (search) {
  //   queryObj.$or = [
  //     { title: { $regex: search, $options: "i" } },
  //     { description: { $regex: search, $options: "i" } },
  //   ];
  // }

  // const result = await Blog.find(queryObj);

  // console.log(result);
  const page = parseInt(req.query.page) || 1;
  const limit = 10;

  const total = await Blog.countDocuments();
  const blogs = await Blog.find(queryObj)
    .populate([
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
    ])
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  res.status(StatusCodes.OK).json({
    blogs,
    length: blogs.length,
    currentPage: page,
    total,
    hasMore: page * limit < total, // whether there are more pages
  });
};

// const getAllBlogs = async (req, res) => {
//   const blogs = await Blog.find()
//     .populate([
//       { path: "createdBy" },
//       {
//         path: "comments",
//         populate: [
//           {
//             path: "createdBy",
//             model: "User",
//           },
//           {
//             path: "replies",
//             populate: {
//               path: "createdBy",
//               model: "User",
//             },
//           },
//         ],
//       },
//       { path: "likes" },
//     ])
//     .sort({ createdAt: -1 });
//   res.status(statusCodes.OK).json({ blogs });
// };

const createBlog = async (req, res) => {
  req.body.createdBy = req.user.userId;

  if (req.file) {
    req.body.media = req.file.filename;
  }

  const newBlog = await Blog.create(req.body);

  await User.findOneAndUpdate(
    { _id: req.user.userId },
    {
      $push: { blogs: newBlog._id },
    }
  );
  res.status(statusCodes.CREATED).json({ newBlog });
};
const deleteBlog = async (req, res) => {
  const removedBlog = await Blog.findByIdAndDelete(req.params.id);
  await User.findOneAndUpdate(
    { _id: req.user.userId },
    {
      $pull: { blogs: req.params.id },
    },
    { new: true }
  );
  res.status(statusCodes.OK).json({ removedBlog });
};
const updateBlog = async (req, res) => {
  console.log(req.file);

  if (req.file) {
    req.body.media = req.file.filename;
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(statusCodes.OK).json({ updatedBlog });
};
const getSingleBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id).populate([
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
  ]);
  if (!blog) throw new NotFoundError("not found");

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

// const likeBlog = async (req, res) => {
//   const { id } = req.params;
//   const { userId } = req.user;

//   const hasLiked = await Blog.findOne({
//     likes: {
//       $elemMatch: {
//         userId,
//         id,
//       },
//     },
//   });

//   let blog;

//   if (hasLiked) {
//     blog = await Blog.findOneAndUpdate(
//       { _id: id },
//       {
//         $pull: { likes: { userId, id } },
//       },
//       {
//         new: true,
//       }
//     );
//   } else {
//     blog = await Blog.findByIdAndUpdate(
//       { _id: id },
//       {
//         $push: { likes: { userId, id } },
//       },
//       { new: true }
//     );
//   }

//   res.status(200).json({ blog });
// };

const likeBlog = async (req, res) => {
  const { id: blogId } = req.params;
  const { userId } = req.user;

  const hasLiked = await Blog.findOne({
    likes: {
      $elemMatch: {
        userId,
        blogId,
      },
    },
  });

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
  }

  res.status(200).json({ blog });
};

const search = async (req, res) => {
  const { search } = req.query;

  console.log(search);

  const blogs = await Blog.find({
    $or: [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ],
  })
    .populate("createdBy")
    .sort({ createdAt: -1 });

  const users = await User.find({
    $or: [
      { firstName: { $regex: search, $options: "i" } },
      { lastName: { $regex: search, $options: "i" } },
    ],
  });

  res.status(StatusCodes.OK).json({ blogs, users });
};
export {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  getSingleBlog,
  likeBlog,
  search,
};
