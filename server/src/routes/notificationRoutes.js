import Router from "express";
import {
  deleteNotifation,
  createNotification,
  getUserNotifications,
  readAllNotications,
} from "../controllers/NotificationController.js";

const router = Router();

router.route("/").get(getUserNotifications).post(createNotification);
router.delete("/:id", deleteNotifation);
router.get("/read-all", readAllNotications);

export default router;
