const fs = require("fs"),
  path = require("path");

let uploadArchivo = (req, res) => {
  let { file } = req.files;

  if (file.originalFilename == "" || !file.originalFilename) {
    fs.unlinkSync(file.path);
    return res.status(400).json({
      ok: false,
      data: null,
      msg: "Subir archivo",
    });
  } else {
    let url = file.path;
    url = url.split("/");
    let urlFile = [url[url.length - 1]];
    return res.status(200).json({
      ok: true,
      data: [urlFile],
      msg: urlFile.length,
    });
  }
};

let verArchivos = (req, res) => {
  let url = req.params.urlFile,
    direccion = req.params.directory,
    pathFile = `./files/${direccion}/${url}`;

  fs.exists(pathFile, (exist) => {
    exist
      ? res.status(200).sendFile(path.resolve(pathFile))
      : res.status(400).send("No existe");
  });
};

let deleteArchivos = (req, res) => {
  let url = req.params.urlFile,
    direccion = req.params.directory,
    pathFile = `./files/${direccion}/${url}`;

  fs.unlink(pathFile, (eliminado) => {
    !eliminado
      ? res.status(200).send("Archivo eliminado")
      : res.status(400).send("El archivo no existe");
  });
};



module.exports = {
  uploadArchivo,
  verArchivos,
  deleteArchivos,
};
