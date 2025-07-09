import e from "express";
import path from "node:path";
import do

const app = e();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
