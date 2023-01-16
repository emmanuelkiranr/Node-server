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

app.get("/dictionary/items", (req, res) => {
  res.json(dictionary);
});
