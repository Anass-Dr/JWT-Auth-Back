const express = require("express");
const apiRoutes = require("./routes/api");

require("dotenv").config();
require("./config/database");

const app = express();

// middlewares
app.use(express.json());
app.use(express.static("public"));
app.use("/api", apiRoutes);

module.exports = app;
