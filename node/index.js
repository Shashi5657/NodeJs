import express from "express";
import users from "./MOCK_DATA.json" assert { type: "json" };

const app = express();

app.get("/", (req, res) => {
  res.send(`Hello ${req.query.name}, This is Home Page`);
});

app.get("/api/users", (req, res) => {
  const html = `
    <ul>
      ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>`;
  res.send(html);
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.listen(8000, () => console.log("Server started on PORT 8000"));
