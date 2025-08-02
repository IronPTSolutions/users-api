const config = require("./config");
const mongoose = require("mongoose");

mongoose
  .connect(config.get("db"))
  .then(() => console.log("Connected to mongo database"))
  .catch((err) => console.error("Failed to connect to the database", err));
