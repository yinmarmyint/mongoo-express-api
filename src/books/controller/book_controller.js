const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://root:password123@ds141188.mlab.com:41188/bookservice1122",
  () => {
    console.log("database is connected");
  }
);

app.use(bodyParser.json());

app.post("/book", (req, res) => {
  console.log(req.body);
});
