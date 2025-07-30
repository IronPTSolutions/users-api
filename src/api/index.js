const express = require("express");
const router = express.Router();

const { findUserById } = require('./middlewares');

const users = require("./controllers/users.controller");
const addresses = require("./controllers/addresses.controller");

// USERS CRUD

// CREATE
router.post("/users", users.create);

// READ
router.get("/users", users.list);
router.get("/users/:id", users.detail);

// UPDATE
router.patch("/users/:id", users.update);

// DELETE
router.delete("/users/:id", users.delete);

// USER ADDRESSES CRUD

router.post("/users/:userId/addresses", findUserById("userId"), addresses.create);
router.get("/users/:userId/addresses", findUserById("userId"), addresses.list);
router.get("/users/:userId/addresses/:id", findUserById("userId"), addresses.detail);
router.patch("/users/:userId/addresses/:id", findUserById("userId"), addresses.update);
router.delete("/users/:userId/addresses/:id", findUserById("userId"), addresses.delete);

module.exports = router;
