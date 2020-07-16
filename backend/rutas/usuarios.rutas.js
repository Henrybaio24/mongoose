const express = require("express"),
  multiParty = require("connect-multiparty");

let api = express.Router(),
  usuarioControlador = require("../controladores/usuarios.controlador"),
  passwordControlador = require("../controladores/middlewares/password.controlador"),
  authControlador = require("../controladores/middlewares/auth.controlador"),
  rolControlador = require("../controladores/middlewares/rol.controlador");

api.get("/usuarios", [authControlador.auth, rolControlador.admin], usuarioControlador.getUsuario);
api.get("/usuarios/:nombre", authControlador.auth, usuarioControlador.getUsuarioPorNombre);
api.get("/usuario/:id",[authControlador.auth],usuarioControlador.getUsuario);

api.post("/usuario", passwordControlador.middlewarePassword, usuarioControlador.postUsuario);
api.post("/login", usuarioControlador.loginUsuarios);
api.put("/usuario/:id", authControlador.auth, usuarioControlador.updateUsuario);
api.delete("/usuario/:id", authControlador.auth, usuarioControlador.deleteUsuario);

module.exports = api;


