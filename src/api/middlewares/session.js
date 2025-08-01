const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const User = require('../../lib/models/user.model');

const session = expressSession({
  secret: 'super-secret',
  saveUninitialized: false,
  resave: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7 * 1000
  },
  store: MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/users-api',
    ttl: 60 * 60 * 24 * 7
  })
});

const loadSessionUser = async (req, res, next) => {
  const { userId } = req.session;
  if (!userId) next();
  else {
    const user = await User.findById(userId);
    if (user) req.sessionUser = user;
    next();
  }
}

module.exports = {
  session,
  loadSessionUser
}