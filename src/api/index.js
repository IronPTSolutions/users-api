const express = require("express");
const router = express.Router();

const { 
  findUserById, 
  session: { loadSessionUser, session },
  secure: { isAuthenticated, isAdmin }
} = require('./middlewares');

const users = require("./controllers/users.controller");
const addresses = require("./controllers/addresses.controller");
const sessions = require("./controllers/sessions.controller");

router.use(session);
router.use(loadSessionUser);

// SESSIONS CRUD
router.post("/sessions", sessions.create);
router.delete("/sessions/me", sessions.delete);

// USERS CRUD
router.post("/users", users.create);
router.get("/users", isAuthenticated, isAdmin, users.list);
router.get("/users/:id", isAuthenticated, users.detail);
router.patch("/users/:id", isAuthenticated, users.update);
router.delete("/users/:id", isAuthenticated, users.delete);

// USER ADDRESSES CRUD
router.post("/users/me/addresses", isAuthenticated, addresses.create);
router.get("/users/me/addresses", isAuthenticated, addresses.list);
router.get("/users/me/addresses/:id", isAuthenticated, addresses.detail);
router.patch("/users/me/addresses/:id", isAuthenticated, addresses.update);
router.delete("/users/me/addresses/:id", isAuthenticated, addresses.delete);

module.exports = router;
