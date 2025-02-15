import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => res.send("Get All Subscriptions"));
subscriptionRouter.get("/:id", (req, res) =>
  res.send("Get Subscription details")
);
subscriptionRouter.post("/", (req, res) => res.send("Create Subscription"));
subscriptionRouter.put("/:id", (req, res) =>
  res.send("Update the Subscription")
);
subscriptionRouter.delete("/:id", (req, res) =>
  res.send("Delete Subscription")
);
subscriptionRouter.get("/user/:id", (req, res) =>
  res.send("Get All User Subscriptions")
);
subscriptionRouter.put("/:id/cancel", (req, res) =>
  res.send("Cancel Subscriptions")
);
subscriptionRouter.get("/upcoming-renewals", (req, res) =>
  res.send("Get All upcoming renewals")
);


export default subscriptionRouter