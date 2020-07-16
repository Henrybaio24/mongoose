const express = require("express"),
  bodyParser = require("body-parser"),
  connectDB = require("../config/db"),
  passport = require("passport"),
  cors = require("cors"),
  parseurl = require("parseurl");

let app = express(),
  session = require("express-session"),
  archivosRutas = require("../rutas/files.rutas"),
  cursoRutas = require("../rutas/cursos.rutas"),
  usuarioRutas = require("../rutas/usuarios.rutas"),
  materialRutas = require("../rutas/material.rutas"),
  
  db = connectDB(),
  sess = {
    //SESSION CONFIG
    secret: process.env.KEY_SESSION,
    resave: false,
    saveUninitialized: true,
    name: "sessionID",
    cookie: {
      httpOnly: false,
      maxAge: parseInt(process.env.TIME),
    },
  },
  corsOptions = {
    origin: "http://localhost:4200",
    optionsSuccessStatus: 200,
  };

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());


app.use(cors(corsOptions));

app.use(session(sess));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  if (!req.session.views) {
    req.session.views = {};
  }
  let pathname = parseurl(req).pathname;
  req.session.views[pathname] = (req.session.views[pathname] || 0) + 1;
  next();
});

//Rutas
app.use("/api", archivosRutas);
app.use("/api", usuarioRutas);
app.use("/api", cursoRutas);
app.use("/api", materialRutas);

module.exports = app;
