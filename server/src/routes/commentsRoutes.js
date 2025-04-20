import { Router } from "express";
import {
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/commentsController.js";

const router = Router();

router
  .route("/")
  .post(createComment)
  .patch(updateComment)
  .delete(deleteComment);

export default router;
