import http from "http";

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  switch (req.url) {
    case "/":
      res.end("<p>This is home page!</p>");
    case "/api/users":
      let json = JSON.stringify(getUsers());
      res.end(json);
  }
});

server.listen(3000, "localhost", () => {
  console.log(`Server running on localhost 3000`);
});

server.on("listening", () => {});

server.on("request", (req, res) => {
  console.log(`${req.method} request received on ${res.url}`);
});

function getUsers() {
  return [
    {
      email: "qwe@gmail.com",
      name: "Alice",
    },
    {
      email: "asd@gmail.com",
      name: "Bob",
    },
    {
      email: "zxc@gmail.com",
      name: "Carol",
    },
  ];
}
