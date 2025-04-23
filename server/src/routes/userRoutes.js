import { Router } from "express";
import {
  deleteUser,
  getCurrentUser,
  updateUser,
} from "../controllers/userController.js";

const router = Router();

router.route("/").get(getCurrentUser).delete(deleteUser).patch(updateUser);

export default router;
