const express = require("express");
const app = express();
const core = require("cors");

app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

module.exports = app;
