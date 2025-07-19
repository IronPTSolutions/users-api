let users = require("../data/users.json");

// FAKE MODEL. used to simulate a database

const find = () => Promise.resolve(users);

const findById = (id) => Promise.resolve(users.find((user) => user.id == id));

const create = (user) => {
  if (!user.username) {
    return Promise.reject("missing username");
  }

  const newUser = { ...user, id: users.length + 1 };
  users.push(newUser);
  return Promise.resolve(newUser);
};

const findByIdAndUpdate = (id, data) => {
  const user = users.find((user) => user.id == id);

  if (user) {
    Object.assign(user, data);
  }

  return Promise.resolve(user);
};

const findByIdAndDelete = (id) => {
  users = users.filter((user) => user.id != id);
  return Promise.resolve();
};

module.exports = {
  find,
  findById,
  create,
  findByIdAndUpdate,
  findByIdAndDelete,
};
