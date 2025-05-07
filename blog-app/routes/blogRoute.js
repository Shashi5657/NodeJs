import e from "express";
import multer from "multer";
import path from "node:path";
import { Blog } from "../models/blogModel.js";
import { Comment } from "../models/commentModel.js";

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

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id)
    .populate({
      path: "createdBy",
      select: "fullName profileImageUrl", // Only get these fields
    })
    .lean();

  const comments = await Comment.find({ blogId: req.params.id }).populate(
    "createdBy"
  );

  console.log("Blog with user:", blog); // Debug log
  if (!blog) {
    return res.status(404).send("Blog not found");
  }
  res.render("blog", {
    blog,
    user: req.user,
    comments,
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

router.post("/comment/:blogId", async (req, res) => {
  await Comment.create({
    content: req.body.content,
    blogId: req.params.blogId, // This is now correctly getting the ID from the URL
    createdBy: req.user.id,
  });

  return res.redirect(`/blog/${req.params.blogId}`);
});

export default router;
