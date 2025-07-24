const mongoose = require("mongoose");
const User = require("../models/user.model");

module.exports.list = (req, res, next) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.detail = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "user not found" });
      }
    })
    .catch((err) => next(err));
};

module.exports.create = (req, res, next) => {
  User.create(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ errors: err.errors });
      }

      next(err);
    });
};

module.exports.update = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "user not found" });
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ errors: err.errors });
      }

      next(err);
    });
};

module.exports.delete = (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      if (user) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "user not found" });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: "invalid request" });
    });
};
