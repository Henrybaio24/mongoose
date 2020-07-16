const mongoose = require("mongoose");

const { Schema } = mongoose;

const usuarioModel = Schema({
  nombre: { type: String },
  apellido: { type: String },
  email: { type: String },
  imagen: { type: String },
  password: { type: String },
  sessionID: { type: String },
  createAt: { type: Date },
});

module.exports = mongoose.model("Usuario", usuarioModel);
