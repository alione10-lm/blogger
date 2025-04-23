import { Router } from "express";
import {
  createComment,
  updateComment,
  deleteComment,
  createReply,
  deleteReply,
} from "../controllers/commentsController.js";
import { validateCommentInput } from "../utils/validators.js";

const router = Router();

router
  .route("/")
  .post(validateCommentInput, createComment)
  .patch(validateCommentInput, updateComment)
  .delete(deleteComment);

router.post("/reply", createReply);
router.delete("/reply", deleteReply);

export default router;
