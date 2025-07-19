const express = require("express");
const createError = require("http-errors");
const logger = require("morgan");
const User = require("./models/user.model");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.get("/", (req, res, next) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

// USERS CRUD

// READ. LIST
app.get("/api/v1/users", (req, res, next) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      next(err);
    });
});

// READ. DETAIL
app.get("/api/v1/users/:id", (req, res, next) => {
  User.findById(req.params.id).then((user) => {
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "user not found" });
    }
  });
});

// CREATE
app.post("/api/v1/users", (req, res, next) => {
  User.create(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      res.status(400).json({ message: "review body" });
    });
});

// UPDATE
app.patch("/api/v1/users/:id", (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "user not found" });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: "review body" });
    });
});

// DELETE
app.delete("/api/v1/users/:id", (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      res.status(204).send();
    })
    .catch((err) => {
      res.status(400).json({ message: "invalid request" });
    });
});

app.use((req, res, next) => {
  next(createError(400, "Route not found"));
});

app.use((error, req, res, next) => {
  if (!error.status) error = createError(500, error.message);
  console.error(error);

  res.status(error.status).json({ message: error.message });
});

app.listen(3000, () => console.info(`Application running at port 3000`));
