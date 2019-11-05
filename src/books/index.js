const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

require("./controller/book_controller");

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.post("/book", (req, res) => {
  console.log("===>", req.body);
});

app.listen("8080", () => {
  console.log("Book service is running");
});
