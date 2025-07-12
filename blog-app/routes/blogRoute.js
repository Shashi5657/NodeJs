import e from "express";
import multer from "multer";
import path from "node:path";
import { Blog } from "../models/blogModel.js";

const router = e.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/uploads"));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.get("/add-blog", (req, res) => {
  res.render("addBlog", {
    user: req.user,
  });
});

router.post("/", upload.single("coverImage"), async (req, res) => {
  console.log(req.user, "user");  

  const { title, body } = req.body;
  try {
    const blog = await Blog.create({
      title,
      body,
      coverImage: req.file ? `/uploads/${req.file.filename}` : null,
      createdBy: req.user.id,
    });
    return res.redirect(`/blog/${blog._id}`);
  } catch (error) {
    console.error("Error creating blog:", error);
    return res.status(500).send("Internal Server Error");
  }
});

export default router;
