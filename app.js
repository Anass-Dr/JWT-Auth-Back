require("dotenv").config();
require("./config/database");
const express = require("express");

const apiRoutes = require("./routes/api");
const requestValidator = require("./middleware/requestValidator");


const app = express();

// middlewares
app.use(express.json());
app.use(express.static("public"));
app.use(requestValidator);
app.use("/api", apiRoutes);

module.exports = app;
