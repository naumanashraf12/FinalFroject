var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var winston = require("winston");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/api/users");
var productsRouter = require("./routes/api/products");
var authRouter = require("./routes/api/auth");
var testRouter = require("./routes/api/test");
var config = require("config");
var app = express();
const { startCronJobs } = require("./cron-jobs/index");
// view engine setup
app.set("views", path.join(__dirname, "views"));

app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "client/build")));
// app.use("/", indexRouter);
app.use("/", testRouter);
app.use("/", usersRouter);
app.use("/", productsRouter);
app.use("/", authRouter);

startCronJobs();
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
var db = config.get("db");
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    socketTimeoutMS: 0,
    connectionTimeout: 0,
  })
  .then(() => {
    winston.info(`Connected to ${db}...`);
    // console.clear();
    console.log(`Connected to ${db}...`);
  })
  .catch((err) => {
    console.log(err);
    winston.error("DB Connection Error");
  });

console.log("Environment: " + config.get("myEnvironment"));

module.exports = app;
