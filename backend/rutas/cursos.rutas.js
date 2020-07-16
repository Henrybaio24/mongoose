const express = require("express");

let api = express.Router(),
  cursoControlador = require("../controladores/cursos.controlador"),
  authControlador = require("../controladores/middlewares/auth.controlador");

api.get("/cursos", authControlador.auth, cursoControlador.getCurso);
api.get("/curso/:_id", authControlador.auth, cursoControlador.getOneCurso);
api.post("/curso", authControlador.auth, cursoControlador.postCurso);
api.put("/curso/:_id", authControlador.auth, cursoControlador.updateCurso);
api.delete("/curso/:_id", authControlador.auth, cursoControlador.deleteCurso);

module.exports = api;

