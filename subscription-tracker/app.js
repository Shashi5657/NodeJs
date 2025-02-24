import express from "express";

import { PORT, MONGO_URI } from "./config/env.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToDatabase from "./database/mongodb.js";
import cookieParser from "cookie-parser";
import errorMiddleWare from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

app.use(errorMiddleWare);

app.get("/", (req, res) => {
  res.send("Welcome to the subscription tracker api");
});

app.listen(PORT, async () => {
  console.log(`tracker api is running on port ${PORT}`);

  await connectToDatabase();
});

export default app;
