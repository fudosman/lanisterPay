const express = require("express");
const app = express();
const globalErrorHandler = require("./errors/app_error_handler");
require("./middlewares/pre-route.middleware")(app);


// API
app.use("/split-payment", require("./routes/index.js"));

// PING
app.get("/ping", (req, res) => res.status(200).send("the server is running!"));

// Not Found route
app.all("*", (req, res) => {
  res.status(404).json({
    status: "failed",
    message: "Can't find " + req.originalUrl + " on this server",
  });
});

// Error middlewares
app.use(globalErrorHandler);

module.exports = app;