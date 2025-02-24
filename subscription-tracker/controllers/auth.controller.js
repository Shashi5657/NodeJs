import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { email, name, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [newUser] = await User.create(
      [{ name, email, password: hashedPassword }],
      { session }
    );

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "user created successfully",
      data: {
        token,
        user: newUser,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession(); // Ensure session ends on error
  }
};

export const signIn = (req, res, next) => {};

export const signOut = (req, res, next) => {};
