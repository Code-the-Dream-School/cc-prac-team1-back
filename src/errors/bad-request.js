/**
 * This file defines a custom error handler middleware that
 * sends a 400 status code with a JSON error message for any
 * request that has invalid or missing parameters
 */

// Imports
const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./custom-api");

// Extends the CustomAPIError class and sets the HTTP status code to 400 Bad Request
class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

// Exports custom error class
module.exports = BadRequestError;
