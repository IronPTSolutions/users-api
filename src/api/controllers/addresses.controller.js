const createError = require("http-errors");
const Address = require("../../lib/models/address.model");

const AddressNotFound = createError(404, "Address not found");

module.exports.create = async (req, res, next) => {
  const address = await Address.create({
    ...req.body,
    user: req.user.id,
  });
  res.status(201).json(address);
};

module.exports.list = async (req, res, next) => {
  const addresses = await Address.find({ user: req.user.id })
    .populate("user");
  res.json(addresses);
};

module.exports.detail = async (req, res, next) => {
  const address = await Address.findById(req.params.id)
    .populate("user");
  if (address) res.json(address);
  else next(AddressNotFound);
};

module.exports.update = async (req, res, next) => {
  delete req.body.user;
  const criterial = { _id: req.params.id, user: req.user.id };
  const address = await Address.findOneAndUpdate(
    criterial, 
    req.body, 
    {
      new: true,
      runValidators: true,
    }
  ).populate("user");
  if (address) res.json(address);
  else next(AddressNotFound);
};

module.exports.delete = async (req, res, next) => {
  const criterial = { _id: req.params.id, user: req.user.id };
  const address = await Address.findOneAndDelete(criterial);
  if (address) res.status(204).send();
  else next(AddressNotFound);
};
