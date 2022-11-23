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
      let users = getUsers();
      // req.url => http://localhost:3000/api/users, http://localhost:3000/api/users?id=3

      let itemsPerPage = 2;
      let totalPages = Math.ceil(users.length / itemsPerPage); // 3
      let pageNumber = 1;

      let requestedPage = parseInt(link.query.page); // 1 // 3
      if (!isNaN(requestedPage)) {
        pageNumber = requestedPage;
      }

      let startIndex = (pageNumber - 1) * itemsPerPage; // 0 // 4
      let endIndex = pageNumber * itemsPerPage; // 2 // 6

      let response = {
        itemsPerPage: itemsPerPage,
        totalPages: totalPages,
        pageNumber: pageNumber,
        data: users.slice(startIndex, endIndex), // 1, 2
      };

      let json = JSON.stringify(response);
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
    {
      id: id++,
      email: "aff@gmail.com",
      name: "Joe",
    },
    {
      id: id++,
      email: "gr@gmail.com",
      name: "Ash",
    },
    {
      id: id++,
      email: "fs@gmail.com",
      name: "Dan",
    },
  ];
}
