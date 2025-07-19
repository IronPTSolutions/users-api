const posts = [];

// FAKE MODEL. used to simulate a database

const find = () => Promise.resolve(posts);

const findById = (id) => Promise.resolve(posts.find((post) => post.id == id));

const create = (post) => {
  const newpost = { ...post, id: posts.length + 1 };
  posts.push(newpost);
  return Promise.resolve(newpost);
};

const findByIdAndUpdate = (id, data) => {
  const post = posts.find((post) => post.id == id);

  if (post) {
    Object.assign(post, data);
  }

  return Promise.resolve(post);
};

const findByIdAndDelete = (id) => {
  posts = posts.filter((post) => post.id != id);
  return Promise.resolve();
};

module.exports = {
  find,
  findById,
  create,
  findByIdAndUpdate,
  findByIdAndDelete,
};
