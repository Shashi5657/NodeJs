import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  createSubscription,
  getUserSubscriptions,
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => res.send("Get All Subscriptions"));
subscriptionRouter.get("/:id", (req, res) =>
  res.send("Get Subscription details")
);
subscriptionRouter.post("/", authorize, createSubscription);
subscriptionRouter.put("/:id", (req, res) =>
  res.send("Update the Subscription")
);
subscriptionRouter.delete("/:id", (req, res) =>
  res.send("Delete Subscription")
);
subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);
subscriptionRouter.put("/:id/cancel", (req, res) =>
  res.send("Cancel Subscriptions")
);
subscriptionRouter.get("/upcoming-renewals", (req, res) =>
  res.send("Get All upcoming renewals")
);

export default subscriptionRouter;
