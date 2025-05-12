import { StatusCodes } from "http-status-codes";
import Notification from "../models/Notification.js";

export const getUserNotifications = async (req, res) => {
  console.log(req.user.userId);
  const notifications = await Notification.find({
    user: req.user.userId,
  });
  res.status(StatusCodes.OK).json({ notifications });
};
export const createNotification = async (req, res) => {
  const notification = await Notification.create(req.body);
  res.status(StatusCodes.OK).json({ message: "created", notification });
};

export const deleteNotifation = async (req, res) => {
  await Notification.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ message: "deleted" });
};
