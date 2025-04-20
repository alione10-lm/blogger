import mongoose from "mongoose";

const likesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
  likedAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Like", likesSchema);
