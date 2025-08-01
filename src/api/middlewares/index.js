const createError = require("http-errors");
const session = require("./session");
const secure = require("./secure");
const User = require("../../lib/models/user.model");

const UserNotFound = createError(404, "User not found");

module.exports.findUserById = (pathParameter = "id") => {
  return async (req, res, next) => {
    const userId = req.params[pathParameter];
    const user = await User.findById(userId);
    if (!user) next(UserNotFound);
    else {
      req.user = user;
      next();
    }
  }
}

module.exports.session = session;
module.exports.secure = secure;