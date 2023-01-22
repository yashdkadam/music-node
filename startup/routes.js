const express = require("express");
const genres = require("../routes/genres");
const customers = require("../routes/customers");
const movies = require("../routes/movies");
const songs = require("../routes/songs");
const rentals = require("../routes/rentals");
const users = require("../routes/users");
const auth = require("../routes/auth");
const torrents = require("../routes/torrents");
const returns = require("../routes/returns");
const url = require("../routes/url");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/songs", songs);
  app.use("/api/rentals", rentals);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/torrents", torrents);
  app.use("/api/url", url);
  app.use("/api/returns", returns);
  app.use(express.static("temp"));
  app.use(error);
};
