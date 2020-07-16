const express = require("express");

let api = express.Router(),
  materialControlador = require("../controladores/materiales.controlador"),
  authControlador = require("../controladores/middlewares/auth.controlador");

api.get("/materiales", authControlador.auth, materialControlador.getMaterial);
api.get("/material/:_id", authControlador.auth, materialControlador.getOneMaterial);
api.post("/material", authControlador.auth, materialControlador.postMaterial);
api.put("/material/:_id", authControlador.auth, materialControlador.updateMaterial);
api.delete("/material/:_id", authControlador.auth, materialControlador.deleteMaterial);

module.exports = api;