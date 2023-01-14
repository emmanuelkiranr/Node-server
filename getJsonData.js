import { createServer } from "http";
import url from "url";

createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  let json = getUsers();
  let link = url.parse(req.url, true);
  let path = link.pathname;
  let user;
  switch (path) {
    case "/":
      res.end(JSON.stringify(json));
      break;
    case "/alice":
      user = json.filter((obj) => obj.name === "Alice");
      // console.log(user);
      res.end(JSON.stringify(user));
      break;
    case "/carol":
      user = json.filter((obj) => obj.name === "Carol");
      res.end(JSON.stringify(user));
      break;
    default:
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write(
        `        <!DOCTYPE html>
        <html>
          <head>
            <title>Page not found</title>
          </head>
          <body>
            <h3>404 Error</h3>
            <p>Page not found, please contact admin</p>
          </body>
        </html>`
      );
      res.end();
  }
}).listen(3000);

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
