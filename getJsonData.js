import http from "http";
import url from "url";

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  const link = url.parse(req.url, true);
  const path = link.pathname;
  switch (path) {
    case "/":
      res.end("<p>This is home page!</p>");
      break;
    case "/api/users":
      let json = JSON.stringify(getUsers());
      res.setHeader("Content-Type", "application/json");
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

function getUsers() {
  let id = 1;
  return [
    {
      id: id++,
      email: "qwe@gmail.com",
      name: "Alice",
    },
    {
      id: id++,
      email: "asd@gmail.com",
      name: "Bob",
    },
    {
      id: id++,
      email: "zxc@gmail.com",
      name: "Carol",
    },
  ];
}
