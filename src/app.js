const config = require('./lib/config');

const express = require("express");
const mongoose = require("mongoose");
const createError = require("http-errors");
const logger = require("morgan");

require("./lib/db");

const app = express();

// Middlewares
app.use(logger("dev"));
app.use(express.json());

// Load API routes
app.use("/api/v1", require("./api"));

app.use((req, res, next) => {
  next(createError(400, "Route not found"));
});

app.use((error, req, res, next) => {
  console.error(error);

  if (error instanceof mongoose.Error.CastError && error.message.includes('_id')) {
    error = createError(404, 'Resource not found');
  } if (error instanceof mongoose.Error.ValidationError) error = createError(400, error);
  if (!error.status) error = createError(500, error.message);

  const errorResponse = { message: error.message };
  if (error.errors) {
    errorResponse.errors = Object.keys(error.errors)
      .reduce((responseErrors, errorKey) => {
        responseErrors[errorKey] = error.errors[errorKey].message || error.errors[errorKey];
        return responseErrors;
      }, {}); 
  }
  res.status(error.status).json(errorResponse);
});

app.listen(config.get('port'), () => console.info(`Application running at port ${config.get('port')}`));
