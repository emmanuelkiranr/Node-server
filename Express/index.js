import express from "express";
import { engine } from "express-handlebars";
import dictionary from "./dictionary.json" assert { type: "json" };
import parser from "body-parser";
import fs from "fs";

const app = express();
app.listen(3000).on("listening", () => {
  console.log(`Server running on port 3000`);
});

app.engine("handlebars", engine());
app.set("view engine", "handlebars");

app.use("/", parser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  if (Object.keys(req.body).length) {
    console.log(req.body);
  }
  next();
});

app.get("/dictionary/items", (req, res) => {
  res.json(dictionary);
});

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
