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

router.route("/").post(validateCommentInput, createComment);

router
  .route("/:id")
  .delete(deleteComment)
  .patch(validateCommentInput, updateComment);

router.post("/reply", createReply);
router.delete("/reply/:id", deleteReply);

export default router;
