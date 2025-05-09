import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: String,
    media: String,
    description: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    likes: [
      {
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
      },
    ],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    shares: Number,
  },

  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
