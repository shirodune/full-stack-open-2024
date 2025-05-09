const logger = require("./logger");
const jwt = require("jsonwebtoken");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const userExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  console.log(authorization);
  console.log(request.method);

  if (authorization && authorization.startsWith("Bearer ")) {
    const decodedToken = jwt.verify(
      authorization.replace("Bearer ", ""),
      process.env.SECRET,
    );
    if (decodedToken.id) {
      request.user = decodedToken.id;
      next();
      return;
    }
  }
  if (request.method === "GET") {
    next();
    return;
  } else {
    return response.status(401).json({ error: "token invalid" });
  }
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endponint" });
};

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return response
      .status(400)
      .json({ error: "expected `username` to be unique" });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "token invalid" });
  }

  next(error);
};

module.exports = {
  requestLogger,
  userExtractor,
  unknownEndpoint,
  errorHandler,
};
