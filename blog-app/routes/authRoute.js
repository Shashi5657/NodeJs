import e from "express";
import User from "../models/userModel.js";
import crypto from "node:crypto";

const router = e.Router();

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/signup", async (req, res) => {
  console.log(req.body);
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  const user = await User.create({
    fullName,
    email,
    password,
  });

  return res.redirect("/");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.matchPassword(email, password);

  console.log(user, "user");
  res.redirect("/");
});

export default router;
