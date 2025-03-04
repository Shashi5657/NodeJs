const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
  process.exit();
});

server.listen(3000, () => {
  console.log("server running on port 3000");
});
