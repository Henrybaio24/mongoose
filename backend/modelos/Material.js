const mongoose = require("mongoose");

const { Schema } = mongoose;

const materialModel = Schema({
  nombre: { type: String },
  descripcion: { type: String },
});

module.exports = mongoose.model("Material", materialModel);