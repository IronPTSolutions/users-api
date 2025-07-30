const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre de la dirección es requerido"],
      trim: true,
      minlength: [2, "El nombre debe tener al menos 2 caracteres"],
      maxlength: [100, "El nombre no puede exceder 100 caracteres"],
    },
    num: {
      type: String,
      required: [true, "El número de la dirección es requerido"],
      trim: true,
      match: [
        /^[0-9]+[A-Za-z]?(\s?-\s?[0-9]+[A-Za-z]?)?$/,
        "Formato de número inválido (ej: 123, 123A, 123-125)",
      ],
    },
    zipCode: {
      type: String,
      required: [true, "El código postal es requerido"],
      trim: true,
      match: [
        /^[0-9]{5}$/,
        "El código postal debe tener exactamente 5 dígitos",
      ],
    },
    town: {
      type: String,
      required: [true, "La ciudad es requerida"],
      trim: true,
      minlength: [2, "La ciudad debe tener al menos 2 caracteres"],
      maxlength: [50, "La ciudad no puede exceder 50 caracteres"],
    },
    region: {
      type: String,
      required: [true, "La región/provincia es requerida"],
      trim: true,
      minlength: [2, "La región debe tener al menos 2 caracteres"],
      maxlength: [50, "La región no puede exceder 50 caracteres"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "El usuario es requerido"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const Address = mongoose.model("Address", schema);

module.exports = Address;
