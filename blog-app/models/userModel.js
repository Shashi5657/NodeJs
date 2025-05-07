import mongoose, { Schema, Model } from "mongoose";
import crypto from "node:crypto";
import { createtoken } from "../services/authService.js";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageUrl: {
      type: String,
      default: "/images/default.png",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { collection: "users", timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;

  if (user.isModified("password")) {
    const salt = crypto.randomBytes(16).toString();
    const hashedPassword = crypto
      .createHmac("sha256", salt)
      .update(user.password)
      .digest("hex");

    user.salt = salt;
    user.password = hashedPassword;
    next();
  }
});

userSchema.static("matchPassword", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("User not found");

  const salt = user.salt;
  const hashedPassword = user.password;
  const userProvidedPassword = crypto
    .createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  if (hashedPassword !== userProvidedPassword) {
    throw new Error("Invalid password");
  }

  const token = await createtoken(user);
  return token;
});

const User = mongoose.model("User", userSchema);

export default User;
