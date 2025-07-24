const express = require("express");
const router = express.Router();

const users = require("../controllers/users.controller");

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

module.exports = router;
