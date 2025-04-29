import { Router } from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getSingleBlog,
  likeBlog,
  updateBlog,
} from "../controllers/BlogController.js";
import { validateBlogInputs } from "../utils/validators.js";

const router = Router();

router.route("/").get(getAllBlogs).post(validateBlogInputs, createBlog);
router
  .route("/:id")
  .get(getSingleBlog)
  .delete(deleteBlog)
  .patch(validateBlogInputs, updateBlog);
router.route("/:id/like").post(likeBlog);
// router.route("/like").post(likeBlog);
router.route("/:id/comment");

export default router;
