import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");

  // since we know all html pages are inside view, we set a path and append the url to it
  let path = "./views/";

  switch (req.url) {
    case "/":
      path += "index.html";
      break;
    case "/about":
      path += "about.html";
      break;
    default:
      path += "404.html";
      break;
  }
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.end(data);
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("Listen to requests from localhost");
});

// const server = http.createServer((req, res) => {
//     //   console.log(req.url, req.method);
//     res.setHeader("Content-Type", "text/html");

//     if (req.url == "/") {
//       fs.readFile("./views/index.html", (err, data) => {
//         if (err) {
//           console.log(err);
//           res.end();
//         } else {
//           res.write(data);
//           res.end();
//         }
//       });
//     } else if (req.url == "/about") {
//       fs.readFile("./views/about.html", (err, data) => {
//         if (err) {
//           console.log(err);
//           res.end();
//         } else {
//           // res.write(data);
//           res.end(data);
//         }
//       });
//     } else {
//       fs.readFile("./views/404.html", (err, data) => {
//         if (err) {
//           console.log(err);
//           res.end();
//         } else {
//           // res.write(data);
//           res.end(data);
//         }
//       });
//     }
//   });
