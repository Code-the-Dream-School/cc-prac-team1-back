/**
 * This file exports a custom error class called NotFoundError
 * that extends from CustomAPIError and sets the status code to 404 (NOT_FOUND).
 */

// Imports
const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./custom-api");

// Extends the CustomAPIError class and sets the HTTP status code to 404 Not Found
class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

// Exports custom error class
module.exports = NotFoundError;
