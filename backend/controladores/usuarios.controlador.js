const fs = require("fs"),
  Usuario = require("../modelos/Usuario"),
  bcrypt = require("bcrypt"),
  jwt = require("jsonwebtoken");

let getUsuarios = (req, res) => {
  Usuario.find()
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

let getUsuario = (req, res) => {
  let _id = req.params.id;
  Usuario.find({ _id })
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
        msg: err
      });
    });
};

let getUsuarioPorNombre = (req, res) => {
  let { nombre } = req.params;

  Usuario.find({ nombre })
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

let postUsuario = (req, res) => {
  let { data } = req.body;
  Usuario.create(data)
    .then((data) => {
      res.status(200).json({
        ok: true,
        data: data,
        msg: "listo",
        token: req.token
      });
    })
    .catch((err) => {
      res.status(500).json({
        ok: false,
        data: null,
        msg: "No se pudo crear el usuario",
      });
    });
};

let postUsuarios = (req, res) => {
  let { data } = req.body; //Array de Objetos

  Usuario.insertMany(data)
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

let updateUsuario = (req, res) => {
  let _id = req.params.id,
    data = req.body.data;

  Usuario.updateOne({ _id }, { $set: data })
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

let deleteUsuario = (req, res) => {
  let _id = req.params.id;

  Usuario.deleteOne({ _id })
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

let loginUsuarios = (req, res) => {
  let { data } = req.body,
    email = data.email,
    password = data.password;

  Usuario.find({ email })
    .then((data) => {
        let token,
          tokenB = {
            nombre: data[0].nombre,
            email: data[0].email,
            sessionID: data[0].sessionID,
          };

        bcrypt.compareSync(password, data[0].password)
          ? ((token = jwt.sign({ data: tokenB }, process.env.KEY_JWT, {
              algorithm: "HS256",
              expiresIn: 300,
            })),
            res.status(200).json({
              ok: true,
              data: null,
              msg: "Todo bien",
              token,
            }))
          : res.status(404).json({
              ok: false,
              data: null,
              msg: "Password incorrecta",
              token: null,
            });
    })
    .catch((err) => {
      res.status(404).json({
        ok: false,
        data: null,
        msg: "Email no encontrado",
      });
    });
};

module.exports = {
  getUsuarios,
  getUsuario,
  getUsuarioPorNombre,
  postUsuario,
  postUsuarios,
  updateUsuario,
  deleteUsuario,
  loginUsuarios,
};
