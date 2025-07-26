const createError = require("http-errors");
const Address = require("../models/address.model");

module.exports.create = (req, res, next) => {
  Address.create({
    ...req.body,
    user: req.params.userId,
  })
    .then((address) => {
      res.status(201).json(address);
    })
    .catch(next);
};

module.exports.list = (req, res, next) => {
  Address.find({ user: req.params.userId })
    .populate("user")
    .then((addresses) => {
      res.json(addresses);
    })
    .catch(next);
};

module.exports.detail = (req, res, next) => {
  Address.findById(req.params.id)
    .populate("user")
    .then((address) => {
      if (address) {
        res.json(address);
      } else {
        next(createError(404, "address not found"));
      }
    })
    .catch(next);
};

module.exports.update = (req, res, next) => {
  Address.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .populate("user")
    .then((address) => {
      if (address) {
        res.json(address);
      } else {
        next(createError(404, "address not found"));
      }
    })
    .catch(next);
};

module.exports.delete = (req, res, next) => {
  Address.findByIdAndDelete(req.params.id)
    .then((address) => {
      if (address) {
        res.status(204).send();
      } else {
        next(createError(404, "address not found"));
      }
    })
    .catch(next);
};
