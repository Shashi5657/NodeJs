import express, { urlencoded } from "express";
import fs from "fs";
import users from "./MOCK_DATA.js";
const app = express();
import authRouter from "./routes/authRoute.js";
import connectToDatabase from "./libs/mongodb.js";
import urlRouter from "./routes/urlRoute.js";
import cookieParser from "cookie-parser";
import {
  authMiddleware,
  restrictToUser,
} from "./middlewares/authMiddleware.js";

app.use(express.urlencoded({ extended: false }));

connectToDatabase();

app.use(express.json());
app.use(cookieParser());

app.use("/url", authMiddleware, restrictToUser(["admin"]), urlRouter);

app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send(`Hello ${req.query.name}, This is Home Page`);
});

app.get("/users", (req, res) => {
  const html = `
    <ul>
      ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>`;
  res.send(html);
});

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.JS", JSON.stringify(users), (err, data) => {
    return res.status(200).json({
      success: true,
      message: "User data inserted successfully",
    });
  });
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const userID = Number(req.params.id);
    const user = users.find((user) => user.id === userID);
    return res.json(user);
  })
  .patch((req, res) => {
    //Edit the suser with id
    const userId = Number(req.params.id);
    const user = users.find((user) => user.id === userId);
  })
  .delete((req, res) => {
    //delete the user
    const userId = Number(req.params.id);
    users.filter((user) => user.id !== userId);

    fs.writeFile("./MOCK_DATA.js", JSON.stringify(users), (req, res) => {
      return res.send({ message: "User deleted", success: true });
    });
  });

// app.get("/api/users/:id", (req, res) => {
//   const userID = Number(req.params.id);
//   const user = users.find((user) => user.id === userID);
//   return res.json(user);
// });

// app.patch("/api/users/:id", (req, res) => {
//   //Edit the suser with id
// });

// app.delete("/api/users/:id", (req, res) => {
//   //delete the user
// });

app.listen(8000, () => console.log("Server started on PORT 8000"));
