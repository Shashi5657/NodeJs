import e from "express";
import path from "node:path";

const app = e();

app.set("view engine", "ejs");
app.set("views", path("./views"));

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
