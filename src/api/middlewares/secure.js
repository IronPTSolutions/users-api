const createError = require('http-errors');

module.exports.isAuthenticated = (req, res, next) => {
  if (req.sessionUser) next();
  else next(createError(401, 'Missing credentials'));
}
