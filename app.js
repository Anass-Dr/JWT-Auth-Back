require("dotenv").config();
const express = require("express");
const cookieParser = require('cookie-parser');

const apiRoutes = require("./routes/api");
const requestValidator = require("./middleware/requestValidator");


const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(requestValidator);
app.use("/api", apiRoutes);

module.exports = app;
