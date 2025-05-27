import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    firstName: String,
    bio: String,
    lastName: String,
    position: String,
    birthDate: Date,
    password: String,
    avatar: String,
    avatarPublicId: String,
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

// userSchema.methods.toJSON = function () {
//   let obj = this.toObject();
//   delete obj.password;
//   return obj;
// };

export default mongoose.model("User", userSchema);
