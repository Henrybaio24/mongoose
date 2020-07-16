const Material = require("../modelos/Material");

let getMaterial = (req, res) => {
  Material.find()
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

let getOneMaterial = (req, res) => {
  let { _id } = req.params;

  Material.find({ _id })
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

let postMaterial = (req, res) => {
  let { data } = req.body;
  Material.create(data)
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

let updateMaterial = (req, res) => {
  let { _id } = req.params,
    { data } = req.body;

  Material.updateOne({ _id }, { $set: data })
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

let deleteMaterial = (req, res) => {
  let { _id } = req.params;

  Material.deleteOne({ _id })
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
  getMaterial,
  getOneMaterial,
  postMaterial,
  updateMaterial,
  deleteMaterial,
};