import { createServer } from "http";
import { createReadStream } from "fs";
// const server = http.createServer((req, res) => {
//   res.setHeader("Content-Type", "text/html");

//   // since we know all html pages are inside view, we set a path and append the url to it
//   let path = "./views/";

//   switch (req.url) {
//     case "/":
//       path += "index.html";
//       res.statusCode = 200;
//       break;
//     case "/about":
//       path += "about.html";
//       res.statusCode = 200;
//       break;
//     case "/about-me":
//       res.statusCode = 301;
//       res.setHeader("Location", "/about");
//       res.end();
//       break;
//     default:
//       path += "404.html";
//       res.statusCode = 404;
//       break;
//   }
//   fs.readFile(path, (err, data) => {
//     if (err) {
//       console.log(err);
//       res.end();
//     } else {
//       res.end(data);
//     }
//   });
// });

// server.listen(3000, "localhost", () => {
//   console.log("Listen to requests from localhost");
// });

// since we are setting the status and content type manually for each response, instead use a dynaminc way. Also send file
// using readStream instead of readFile

const sendFile = (res, status, type, file) => {
  res.writeHead(status, { "content-type": type });
  createReadStream(file).pipe(res); // we read the "file" and send it as "res" response using pipe
};

createServer((req, res) => {
  switch (req.url) {
    case "/":
      return sendFile(res, 200, "text/html", "./views/index.html");
    case "/about.html":
      return sendFile(res, 200, "text/html", "./views/about.html");
    case "/styles.css":
      return sendFile(res, 200, "text/css", "./views/styles.css");
    case "/image.jpg":
      return sendFile(res, 200, "image/jpg", "./views/image.jpg");
    default:
      return sendFile(res, 200, "text/html", "./views/404.html");
  }
}).listen(3000);
