import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => res.send("get all users"));
userRouter.get("/:id", (req, res) => res.send("get single users"));
userRouter.post("/", (req, res) => res.send("Create new user"));
userRouter.put("/:id", (req, res) => res.send("Update user"));
userRouter.delete("/:id", (req, res) => res.send("Delete user"));

export default userRouter;
