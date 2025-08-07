const config = require("./config");
const mongoose = require("mongoose");

const db = mongoose
  .connect(config.get("db"))
  .then(() => console.log("Connected to mongo database"))
  .catch((err) => console.error("Failed to connect to the database", err));

module.exports = db;
