const express = require("express"),
  multiParty = require("connect-multiparty");

let api = express.Router(),
  authControlador = require("../controladores/middlewares/auth.controlador"),
  filesControlador = require("../controladores/files.controlador"),
  galeriaMddleware = multiParty({ uploadDir: "./files/galeria" }),
  pdfMiddleware = multiParty({ uploadDir: "./files/pdf" });

api.get("/files/:direccion/:url", filesControlador.verArchivos);

api.post("/galeria",authControlador.auth,galeriaMddleware,filesControlador.uploadArchivo
);
api.post("/filePdfs", pdfMiddleware, filesControlador.uploadArchivo);

api.delete("/files/:direccion/:url", filesControlador.deleteArchivos);


module.exports = api;

