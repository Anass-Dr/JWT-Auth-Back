require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const apiRoutes = require("./routes/api");
const requestValidator = require("./middleware/requestValidator");

const app = express();

const corsOptions = {
  origin: process.env.FRONT_APP_HOST,
  credentials: true,
};

// middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(requestValidator);
app.use("/api", apiRoutes);

module.exports = app;
