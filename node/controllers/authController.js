import User from "../models/userSchema.js";
import { v4 as uuidV4 } from "uuid";
import { setUserId } from "../service/auth.js";
import jwt from "jsonwebtoken";

export const handleSignup = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists)
    return res.status(400).json({ message: "Email already exists" });

  await User.create({
    name,
    email,
    password,
  });

  return res.status(201).json({ message: "user created successfully" });
};

export const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email, password });
  if (!userExists)
    return res.status(401).json({ message: "Invalid username or password" });
  // const sessionId = uuidV4();
  const jwtToken = jwt.sign(
    { id: userExists._id, email: userExists.email, role: userExists.role },
    "Shashi_secret_key",
    {
      expiresIn: "1d",
    }
  );
  setUserId(jwtToken, userExists);
  // res.cookie("token", jwtToken, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production", // Set to true in production
  //   sameSite: "strict", // Helps prevent CSRF attacks
  //   maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
  // });

  return res.status(200).json({ message: "Login successful", token: jwtToken });
};
