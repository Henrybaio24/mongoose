const Curso = require("../modelos/Curso");

let getCurso = (req, res) => {
  Curso.find()
    .then((data) => {
      res.status(200).json({
        ok: true,
        data: data,
        msg: "listo"
      });
    })
    .catch((err) => {
      res.status(500).json({
        ok: false,
        data: null,
        msg: err,
      });
    });
};

let getOneCurso = (req, res) => {
  let { _id } = req.params;

  Curso.find({ _id })
    .then((data) => {
      res.status(200).json({
        ok: true,
        data: data,
        msg: "listo",
      });
    })
    .catch((err) => {
      res.status(500).json({
        ok: false,
        data: null,
        msg: err,
      });
    });
};

let postCurso = (req, res) => {
  let { data } = req.body;
  Curso.create(data)
    .then((data) => {
      res.status(200).json({
        ok: true,
        data: data,
        msg: "listo",
      });
    })
    .catch((err) => {
      res.status(500).json({
        ok: false,
        data: null,
        msg: "No se pudo crear",
      });
    });
};

let updateCurso = (req, res) => {
  let { _id } = req.params,
    { data } = req.body;

  Curso.updateOne({ _id }, { $set: data })
    .then((data) => {
      res.status(200).json({
        ok: true,
        data: data,
        msg: "listo",
        token: req.token,
      });
    })
    .catch((err) => {
      res.status(500).json({
        ok: false,
        data: null,
        msg: err,
      });
    });
};

let deleteCurso = (req, res) => {
  let { _id } = req.params;

  Curso.deleteOne({ _id })
    .then((data) => {
      res.status(200).json({
        ok: true,
        data: data,
        msg: "listo",
      });
    })
    .catch((err) => {
      res.status(500).json({
        ok: false,
        data: null,
        msg: err,
      });
    });
};

module.exports = {
  getCurso,
  getOneCurso,
  postCurso,
  updateCurso,
  deleteCurso,
};
