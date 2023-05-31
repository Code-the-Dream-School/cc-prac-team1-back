/**
 * This file  exports a custom error class named CustomAPIError
 * that extends the built-in Error class and takes a message argument
 * in its constructor.
 */

// This code defines a custom error class that extends the built-in Error class in JavaScript.
class CustomAPIError extends Error {
  constructor(message) {
    super(message);
  }
}

// Exports custom error class
module.exports = CustomAPIError;
