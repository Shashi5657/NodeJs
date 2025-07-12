import e from "express";
import path from "node:path";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/authRoute.js";
import cookieparser from "cookie-parser";
import { checkForCookieToken } from "./middleware/authMiddleware.js";
import blogRoute from "./routes/blogRoute.js";

dotenv.config();
const port = process.env.PORT || 8001;

const app = e();
app.use(e.urlencoded({ extended: false }));
app.use(e.json());
app.use(cookieparser());
app.use(checkForCookieToken("token"));
app.use(e.static(path.resolve("./public")));
import { Blog } from "./models/blogModel.js";

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({}).lean();
  console.log(allBlogs);
  res.render("home", {
    blogs: allBlogs,
  });
});

app.use("/auth", authRoute);
app.use("/blog", blogRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`PORT running on ${port}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });
