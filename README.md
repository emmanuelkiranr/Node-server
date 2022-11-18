## Server

The comms b/w client and server happens via http

In node we write code to create a server and listen to requests from browser and decides what response to send, this lives in the backend of our website

```
    import http from "http";

    const server = http.createServer((req, res) => {
    console.log("Request made");
    console.log(req.url, req.method);
    });
```

- We creating an instance of the server
- The cb runs everytime a request comes in, say a req to home page comes in then the callback runs and sends the homepage to browser
- createServer gives us access to 2 objs req and res, req contains info about the url, req-type:get/post etc, res obj to send response to user

```
- To listen to requests

    server.listen(3000, "localhost", () => {
    // This fn executes when we are listening
    console.log("listening to requests on port 3000");
    });
```

### Response

Basically there are 3 steps

- Specify response header so browser knows what kind of response is it receiving, also uses it to set cookies.

```
    res.setHeader("Content-Type", "text/plane");
```

- To send data to the browser we use write method

```
    res.write("Hello from the server!");
```

Once all responses are sent then we end it using `res.end();`

Ideally we create a separate file for html pages and the node server will read those files and send it back to the browser

```
const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.write("<p>Hello from the server!</p>");
  res.write("<p>This response is of content type text/html</p>");
  res.end();
});
```

```
import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
  //   console.log(req.url, req.method);
  res.setHeader("Content-Type", "text/html");

  fs.readFile("./views/index.html", (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.write(data);
      res.end(); // since we are writing only one object we can also do res.end(data)
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("Listen to requests from localhost");
});
```

Based on the url we have to send different response, so to do routing we use req.url
[routing](link)

```
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
```
