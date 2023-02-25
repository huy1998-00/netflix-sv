const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const cors = require("cors");

const bodyParser = require("body-parser");

const MoviesRoute = require("./routes/movieRoute");

app.use(bodyParser.json());
app.use(cors());

app.use(MoviesRoute);

app.use((req, res, next) => {
  const response = {
    message: "Route not found",
  };
  res.status(404).json(response);
});

app.listen(5000);
