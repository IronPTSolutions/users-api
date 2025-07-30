const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/users-api")
  .then(() => {
    console.log("Connected to users-api mongo database");
  })
  .catch((err) => {
    console.error("Failed to connect to the database", err);
  });
