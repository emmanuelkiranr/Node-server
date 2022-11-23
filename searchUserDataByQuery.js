import http from "http";
import url from "url";
import db from "./userData.js";

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  const link = url.parse(req.url, true);
  const path = link.pathname;
  switch (path) {
    case "/":
      res.end("<p>This is home page!</p>");
      break;
    case "/api/users":
      // let users = db.getUsers();
      let id = link.query.id;

      let user = db.getUserById(id);
      res.setHeader("Content-Type", "application/json");
      const json = JSON.stringify({ data: user });
      res.end(json);
      break;
  }
});

server.listen(3000, "localhost", () => {
  console.log(`Server running on localhost 3000`);
});

server.on("request", (req, res) => {
  console.log(`${req.method} request received on ${req.url}`);
});
