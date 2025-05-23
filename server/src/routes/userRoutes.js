import { Router } from "express";
import {
  deleteUser,
  getAllUser,
  getCurrentUser,
  getSingleUser,
  updateUser,
} from "../controllers/userController.js";

import upload from "../middlewares/multerMiddleware.js";
const router = Router();

router
  .route("/current-user")
  .get(getCurrentUser)
  .delete(deleteUser)
  .patch(upload.single("avatar"), updateUser);
router.get("/:userId", getSingleUser);
router.get("/", getAllUser);

export default router;
