const http = require("http");

const server = http.createServer((req, res) => {
  // console.log(req.url, req.method, req.headers);
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>First Node Page</title></head>");

  if (req.url === "/") {
    res.write("<body><h1>Home Page</h1></body>");
  } else if (req.url.toLowerCase() === "/about") {
    res.write("<body><h1>About Page</h1></body>");
  }
  res.write("<body><h3>First Node Page</h3></body>");
  res.write("</head>");
  // process.exit();
});

server.listen(3000, () => {
  console.log("server running on port 3000");
});
