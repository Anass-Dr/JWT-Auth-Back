const express = require("express");
const apiRoutes = require("./routes/api");
const requestValidator = require("./middleware/requestValidator");

require("dotenv").config();

const app = express();

// middlewares
app.use(express.json());
app.use(express.static("public"));
app.use(requestValidator);
app.use("/api", apiRoutes);

module.exports = app;
