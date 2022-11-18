import http from "http";

let server = http.createServer((req, res) => {
  res.setHeader("content-type", "text/html");
  //   for (let i = 0; i < 10; i++) {
  //     res.write(`<h1>Welcome</h1>`);
  //   }
  //   if (req.url == "/") {
  //     res.end("<h1>Welcome</h1>");
  //   }
  if (req.url == "/") {
    res.write(`
    <html>
    <head>
    <title>${req.url}</title>
    </head>
    <body>
    <h1>Hello</h1>
    </body>
    </html>`);
    res.end("<h1>Welcome</h1>");
  } else if (req.url == "/about") {
    res.end("<h1>About us</h1>");
  } else if (req.url == "/contact") {
    res.end("<h1>Contact</h1>");
  }
});

// when the server is lisening to events
server.on("listening", () => {
  console.log("server listening on port num 3000");
});

// whenever a request event is emitted
server.on("request", (req, res) => {
  console.log(`${req.method} request to page ${req.url}`);
});

server.listen(3000);
