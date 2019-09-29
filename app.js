const express = require("express");
const app = express();
const config = require("./utils/config");
const bodyParser = require("body-parser");
const cors = require("cors");

const {
  requestLogger,
  unknownEndPoint,
  errorHandler
} = require("./utils/middleware");

const emailController = require("./controllers/email");

app.use(bodyParser.json());
app.use(cors());
app.use(requestLogger);

app.use("/api/email", emailController);

app.use(unknownEndPoint);
app.use(errorHandler);

const PORT = process.env.PORT || config.PORT;
app.listen(PORT, () => console.log(`Server running on Port: ${PORT}`));

module.exports = app;
