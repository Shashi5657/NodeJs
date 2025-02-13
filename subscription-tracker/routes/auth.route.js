import { Router } from "express";

const authRouter = Router();

authRouter.post("/signup", (req, res) => res.send("sign-up"));
authRouter.post("/signin", (req, res) => res.send("sign-in"));
authRouter.post("/signout", (req, res) => res.send("sign-out"));

export default authRouter;
