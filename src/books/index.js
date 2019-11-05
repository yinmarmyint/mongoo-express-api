const express = require("express");
require("./controller/book_controller");

const app = express();

app.listen("8080", () => {
  console.log("Book service is running");
});
