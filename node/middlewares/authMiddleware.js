import { getUserId } from "../service/auth.js";
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  // const token = req.cookies?.token;
  console.log(req.headers, "headers");
  const token = req.headers?.authorization?.split(" ")[1];

  if (!token) return res.json({ message: "No token" });
  try {
    const decoded = jwt.verify(token, "Shashi_secret_key");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
  // const user = getUserId(userUid);
  // if (!user) return res.json({ message: "No User found" });

  // req.user = user;
  // next();
};

export const restrictToUser = (roles = []) => {
  return (req, res, next) => {
    console.log(req, "req");
    if (!req.user)
      return res.status(401).json({ message: "Unauthorized access" });
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden access" });
    }
    return next();
  };
};
