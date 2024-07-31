const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const app = express();

const productsRouter = require("./app/api/v1/products/router");

// middlewares
const notFoundMiddleware = require("./app/middlewares/not-found");
const errorHandlerMiddleware = require("./app/middlewares/handler-error");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const v1 = "/api/v1";

app.use(`${v1}`, productsRouter);

// catch 404 and forward to error handler
app.use(notFoundMiddleware);

// error handler
app.use(errorHandlerMiddleware);

module.exports = app;
