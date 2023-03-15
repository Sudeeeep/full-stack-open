const config = require("./utils/config");
const logger = require("./utils/logger");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const middleware = require("./utils/middleware");
const blogsRouter = require("./controllers/blogsRouter");
const usersRouter = require("./controllers/usersRouter");
const loginRouter = require("./controllers/login");

mongoose.set("strictQuery", false);

logger.info("CONNECTING TO..", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info("SUCCESSFULLY CONNECTED TO MONGODB"))
  .catch((err) => logger.error("ERROR CONNECTING TO SERVER:", err.message));

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use(middleware.tokenExtractor);

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);

app.use(middleware.errorHandler);

module.exports = app;
