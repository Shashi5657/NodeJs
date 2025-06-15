import e from "express";

const app = e();

app.get("/", (req, res) => {
  res.send(`Hello ${req.query.name}, This is Home Page`);
});

app.listen(8000, () => console.log("Server started on PORT 8000"));
