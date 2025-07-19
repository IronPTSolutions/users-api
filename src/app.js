const express = require('express');
const createError = require('http-errors');
const logger = require('morgan');
const users = require('./data/users.json');

const app = express();

app.use(logger('dev'));
app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res, next) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

// CRUD 
// CREATE -> POST 201
// READ ->   GET 200
// UPDATE -> PUT | PATCH 200
// DELETE -> DELETE 204

app.get('/users', (req, res, next) => {
  const { name } = req.query;
  if (name) {
    const filteredUsers = users.filter((user) => 
      user.name.toLowerCase().includes(name.toLowerCase())
    );
    res.json(filteredUsers);
  } else {
    res.json(users);
  }
});

app.get('/users/:id', (req, res, next) => {
  const { id } = req.params;
  const user = users.find((user) => user.id == id);
  if (user) res.json(user);
  else next(createError(404, 'User not found'));
});

app.use((req, res, next) => {
  next(createError(400, 'Route not found'));
});

app.use((error, req, res, next) => {
  if (!error.status) error = createError(500, error.message);
  console.error(error);

  res.status(error.status).json({ message: error.message });
});

app.listen(3000, () => console.info(`Application running at port 3000`));
