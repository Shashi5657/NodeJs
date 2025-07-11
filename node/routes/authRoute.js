import e from "express";
import { handleLogin, handleSignup } from "../controllers/authController.js";

const router = e.Router();

router.post("/signup", handleSignup);

router.post("/login", handleLogin);

export default router;
