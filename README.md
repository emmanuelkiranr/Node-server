## Server

The comms b/w client and server happens via http

In node we write code to create a server and listen to requests from browser and decides what response to send, this lives in the backend of our website

```
    import http from "http";
    or use destructurnig import - import {createServer} from "http"; -> createServer((req, res) => {})

    const server = http.createServer((req, res) => {
    console.log("Request made");
    console.log(req.url, req.method);
    });
```

- We create an instance of the server
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
  `res.setHeader("Content-Type", "text/plane");`

- To specify status and header together
  `res.writeHead(200, {"Content-Type": "text/plane"})`

- To send data to the browser we use write method
  `res.write("Hello from the server!");`

```
import http from "http";

const server = http.createServer((req, res) => {
  res.setHeader("Content-type", "text/html");
  for (let i = 0; i <= 10; i++) {
    res.write(`<h1>${i}</h1>`);
  }
  res.end();
});

server.listen(3000, "localhost", () => {
  console.log("Listening to localhost");
});

server.on("listening", () => {
  console.log("Server listening on port number 3000");
});

server.on("request", (req, res) => {
  console.log(`${req.method} request to page:${req.url}`);
  res.end();
});
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
[routing](https://github.com/emmanuelkiranr/Node-server/blob/main/routing.js)

```
const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");

  // since we know all html pages are inside view, we set a path and append the url to it
  let path = "./views/";

  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    default:
      path += "404.html";
      res.statusCode = 404;
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

Redirects

```
case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;

case "/about-me":
      res.statusCode = 301;
      res.setHeader("Location", "/about");
      res.end();
      break;
```

Since in the above method we have to seth the statuscode and path manually for each response and we are writing response using readFile, since for writing large chunks of data we should be using Streams

```
const sendFile = (res, status, type, file) => {
  res.writeHead(status, { "content-type": type });
  createReadStream(file).pipe(res); // we read the "file" and send it as "res" response using pipe
};

This allows us to serve all file types individually
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
```

NOTE: This is just the GET request only, while working with multiple request types like GET, POST, DEL, we use Express.js

### JSON as response

To display a json object as response we need to fetch the object first or explicitely define it in a function and call it.
Then we need to convert it from JSON to string format.

```
let json = JSON.stringify(getUsers());
res.end(json);

// function

function getUsers() {
  return [
    {
      email: "qwe@gmail.com",
      name: "Alice",
    },
    {
      email: "asd@gmail.com",
      name: "Bob",
    },s
  ];
}
```

[code](https://github.com/emmanuelkiranr/Node-server/blob/main/getJsonData.js)

### Parsing an URL

Instead of comparing the path with req.url we can parse the url that is been requested and get the path, pathname, query etc. which then can be used to compare and send response.
Parsing is done using the "url" core module.

```
  const link = url.parse(req.url, true);
  const path = link.pathname;
  switch (path) {
    case "/":
      res.end("<p>This is home page!</p>");
      break;
    case "/api/users":
      res.setHeader("Content-Type", "applicatiom/json");
      let json = JSON.stringify(getUsers());
      res.end(json);
      break;
  }
```

[code](https://github.com/emmanuelkiranr/Node-server/blob/main/getJsonData.js)

### QueryString

It is the name/key value pair appended after the ? in the url request that we send, separated by & if there are multiple key value pair

Once we parse the request url using the url module we get an object which has a property named query, we can use this query object [based on id here] to filter the response we want to send.

Filtering JSON data based on the id passed as query in the url

```
// continuing with the previous example

// req.url => http://localhost:3000/api/users, http://localhost:3000/api/users?id=3

case "/api/users":
    let users = getUsers();
    let id = link.query.id; -  here we get the id from the url ie from the query ie the key value pairs appended after the ? [if nothing is appended then the value is undefined]

    console.log(link.query);
    let user = null;

    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            // we compare the value of id from the query object with the json data we fetched
            user = users[i];
            break;
        }
    }

    let json = JSON.stringify({ data: user }); // we return that particular object only
    res.setHeader("Content-Type", "application/json");
    res.end(json);
    break;
```

[code](https://github.com/emmanuelkiranr/Node-server/blob/main/searchByQuery.js)
[code2](https://github.com/emmanuelkiranr/Node-server/blob/main/searchUserDataByQuery.js)

### QueryString from HTML form data

```
 case "/login":
  let content = fs.readFileSync("./login.html", "utf-8");
  res.end(content);
  break;
```

- Firstly we render the html form when a request is send to the login page

```
<form action="/result">
...
</form>
```

- Once the user submits the form they get automatically redirected to the url we mention in the action attribute of form tag
- Now after the redirection the req.url becomes `/result`. So we render the result page as response which shows the form data

NOTE: Here query is an object with the keys email & password, we get this query from the req.url during redirection cause this is a GET method

```
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
```

[code](https://github.com/emmanuelkiranr/Node-server/blob/main/queryString.js)

### Pagination

Firstly we append the users data into an response object and stringify it before sending it as response

```
let response = {
  itemsPerPage: itemsPerPage,
  totalPages: totalPages,
  pageNumber: pageNumber,
  data: users,
};
```

This will render all the user details so we have to slice it, like 2 items per page.

```
let itemsPerPage = 2;
let totalPages = Math.ceil(users.length / itemsPerPage); // 3
let pageNumber = 1;

let requestedPage = parseInt(link.query.page); // 1
if (!isNaN(requestedPage)) {
  pageNumber = requestedPage;
}

let startIndex = (pageNumber - 1) * itemsPerPage; // 0
let endIndex = pageNumber * itemsPerPage; // 2

let response = {
  itemsPerPage: itemsPerPage,
  totalPages: totalPages,
  pageNumber: pageNumber,
  data: users.slice(startIndex, endIndex), // 1, 2
};
```

## Sending Http requests from html file

`index.handlebars`

```
<div>

    <script>
        fetch(`http://localhost:3000/dictionary/items`).then((res) => {
            return res.json();
        }).then(data => {
            let users = data;
            console.log(users);

            users.forEach(user => {
                const name = `<h3>${user.name}</h3>`
                const definition = `<p>${user.definition}</p>`
                document.querySelector(`h3`).insertAdjacentHTML("beforeend", name)
                document.querySelector('h3').insertAdjacentHTML("beforeend", definition)
            })
        })
    </script>

    <h1>Dictionary words</h1>
    <h3></h3>
</div>
```

- The html file contains a script which sends the request to the server using fetch(), we then inject the response of this request to the html page using document.querySelector.

- Now we need to create the api to handle this request.

- create an express app

```
import dictionary from "./dictionary.json" assert { type: "json" }; - the response of the api is stored here

app.get("/", (req, res) => {
res.render("index");
}); - This will render the html page index.hbs using handlebars, this page contains the above script which sends the request

app.get("/dictionary/items", (req, res) => {
res.json(dictionary);
}); - this controller handles the api request\
```

- The request is automatically send once the page is initially rendered, so we create an additional handler to handle this `get` request once the request is sent to this api we send the json as response.

## Update the json db

```
app.post("/", (req, res) => {
  //   const { name, definition } = req.body; // since req.body is an object we can directly push it
  dictionary.push(req.body); // this doesn't push to the file so create another function to do so
  // here the dictionary contains the latest state but it is not yet written to the file
  save();
  //   res.json({
  //     status: "success",
  //     term: req.body,
  //   });
  res.render("index");
});

const save = () => {
  fs.writeFile("./dictionary.json", JSON.stringify(dictionary), (err) => {
    if (err) {
      throw err;
    }
  });
};
```
