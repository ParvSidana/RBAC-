import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["User", "Admin", "Moderator"],
      default: "User",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.email === process.env.ADMIN_EMAIL.toLowerCase()) this.role = "Admin";
  if (this.email === process.env.MODERATOR_EMAIL.toLowerCase())
    this.role = "Moderator";
  next();
});

export const User = mongoose.model("User", userSchema);
