const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const usersRouter = require("./controllers/users");
const blogsRouter = require("./controllers/blogs");
const commentsRouter = require("./controllers/comments");
const loginRouter = require("./controllers/login");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then((result) => {
    // eslint-disable-line no-unused-vars
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/users", usersRouter);
app.use("/api/blogs", middleware.userExtractor, blogsRouter);
app.use("/api/login", loginRouter);
app.use("/api/comments", commentsRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
