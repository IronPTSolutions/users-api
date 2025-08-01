const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;


require("./address.model");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es requerido"],
      trim: true,
      minlength: [2, "El nombre debe tener al menos 2 caracteres"],
      maxlength: [50, "El nombre no puede exceder 50 caracteres"],
    },
    username: {
      type: String,
      required: [true, "El username es requerido"],
      unique: true,
      trim: true,
      lowercase: true,
      minlength: [3, "El username debe tener al menos 3 caracteres"],
      maxlength: [20, "El username no puede exceder 20 caracteres"],
      match: [
        /^[a-zA-Z0-9._-]+$/,
        "El username solo puede contener letras, números, puntos, guiones y guiones bajos",
      ],
    },
    password: {
      type: String,
      required: [true, "La contraseña es requerida"],
      minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
      maxlength: [128, "La contraseña no puede exceder 128 caracteres"],
    },
    bio: {
      type: String,
      required: [true, "La biografía es requerida"],
      trim: true,
      maxlength: [500, "La biografía no puede exceder 500 caracteres"],
    },
    birthDate: {
      type: Date,
      required: [true, "La fecha de nacimiento es requerida"],
      validate: {
        validator: function (date) {
          const today = new Date();
          const minAge = new Date(
            today.getFullYear() - 100,
            today.getMonth(),
            today.getDate()
          );
          const maxAge = new Date(
            today.getFullYear() - 13,
            today.getMonth(),
            today.getDate()
          );
          return date >= minAge && date <= maxAge;
        },
        message:
          "La fecha de nacimiento debe corresponder a una persona entre 13 y 100 años",
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret.password; // Do not expose password
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

schema.virtual("addresses", {
  ref: "Address",
  localField: "_id",
  foreignField: "user",
});


schema.pre('save', function (next) {
  const user = this;

  if (user.isModified("password")) {
    bcrypt.hash(user.password, SALT_WORK_FACTOR)
      .then((hash) => {
        user.password = hash;
        next();
      })
      .catch((error) => next(error));
  } else {
    next();
  }
});

schema.methods.checkPassword = function (passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password);
}

const User = mongoose.model("User", schema);

module.exports = User;
