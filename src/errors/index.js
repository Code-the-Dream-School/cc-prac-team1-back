/**
 * This file exports several custom error classes for use in a Node.js application.
 */

// Imports
const CustomAPIError = require("./custom-api");
const UnauthenticatedError = require("./unauthenticated");
const NotFoundError = require("./not-found");
const BadRequestError = require("./bad-request");

// Exports custom error classes
module.exports = {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
};
