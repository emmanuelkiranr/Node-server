import http from "http";
import fs from "fs";
import url from "url";

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  const link = url.parse(req.url, true);
  const path = link.pathname;
  const query = link.query;

  switch (path) {
    case "/":
      res.end("<h1>Hello World!</h1>");
      break;

    case "/login":
      let content = fs.readFileSync("./login.html", "utf-8");
      res.end(content);
      break;
    case "/result":
      res.write(query.email);
      res.write(query.password);
      res.end(`<html>
    <head>
    <title>
    </title>
    </head>
    <body>
    <p>${query.email}</p>
    </br>
    <p>${query.password}</p>
    </body>
    </html>`);
  }
});

server.listen(3000, "localhost", () => {
  console.log("Listening to requests from port 3000");
});
