/**
 * This file exports a class called UnauthenticatedError
 * that extends a custom error class and sets the HTTP status
 * code to 401 (UNAUTHORIZED).
 */

// Imports
const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./custom-api");

// Extends the CustomAPIError class and sets the HTTP status code to 401 Unauthorized
class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

// Exports custom error class
module.exports = UnauthenticatedError;
