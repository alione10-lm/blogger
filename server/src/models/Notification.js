import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: String,
    type: {
      type: String,
      enum: ["reply", "comment", "like"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      default: null,
    },
    isRead: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
