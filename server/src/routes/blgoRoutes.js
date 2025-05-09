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
import upload from "../middlewares/multerMiddleware.js";

const router = Router();

router.route("/").get(getAllBlogs).post(upload.single("media"), createBlog);
router
  .route("/:id")
  .get(getSingleBlog)
  .delete(deleteBlog)
  .patch(upload.single("media"), updateBlog);
router.route("/:id/like").post(likeBlog);
// router.route("/like").post(likeBlog);
router.route("/:id/comment");

export default router;
