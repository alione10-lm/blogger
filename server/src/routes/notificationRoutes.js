import Router from "express";
import {
  deleteNotifation,
  createNotification,
  getUserNotifications,
} from "../controllers/NotificationController.js";

const router = Router();

router.route("/").get(getUserNotifications).post(createNotification);
router.delete("/:id", deleteNotifation);

export default router;
