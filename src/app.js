/**
 * This file creates and configures the Express application,
 * including setting up middleware, routes, and error handling.
 */

require("dotenv").config();
require("express-async-errors");

// Imports and initializes an express application
const express = require("express");
const app = express();

// Parses JSON payload into a JavaScript object
app.use(express.json());

//api docs
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('/home/jenny/Node-React-Practicum/cc-prac-team1-back/src/swagger.yaml')

// Security
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

app.set("trust proxy", 1);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  })
);

const authenticateUser = require('./middleware/authentication');



//connectDB
const connectDB = require("./db/connect");
const authenticateUser = require('./middleware/authentication');

// Routers
const petsRouter = require("./routes/pet");
const authRouter = require("./routes/auth");

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));


// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/pets", authenticateUser, petsRouter);



app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Sets up the port number for the Express application to listen on
const port = process.env.PORT || 5005;

// Starts the Express application by establising a connection to a MongoDB database
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

module.exports = { app }