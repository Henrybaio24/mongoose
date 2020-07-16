const mongoose = require("mongoose");

const { Schema } = mongoose;

const cursoModel = Schema({
  nombre: { type: String },
  descripcion: { type: String },
  jornada: {type: String },
  sessionID: { type: String },
  createAt: { type: Date },
});

module.exports = mongoose.model("Curso", cursoModel);
