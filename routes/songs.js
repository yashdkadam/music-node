const { Song, validate } = require("../models/song");
const { Genre } = require("../models/genre");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const moment = require("moment");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const Songs = await Song.find().select("-__v").sort("name");
  res.send(Songs);
});

router.post("/", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const song = new Song({
    url: req.body.url,
    sid: req.body.sid,
    name: req.body.name,
    artist: req.body.artist,
    imgUrl: req.body.imgUrl,
    previewUrl: req.body.previewUrl,
    album: req.body.album,
    popularity: req.body.popularity,
    publishDate: moment().toJSON(),
  });
  try {
    await song.save();
    res.send(song);
  } catch (ex) {
    res.status(403).send("Record already exists.");
  }
});

router.put("/:id", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const song = await Song.findByIdAndUpdate(
    req.params.id,
    {
      url: req.body.url,
      sid: req.body.sid,
      name: req.body.name,
      artist: req.body.artist,
      imgUrl: req.body.imgUrl,
      previewUrl: req.body.previewUrl,
      album: req.body.album,
      popularity: req.body.popularity,
    },
    { new: true }
  );

  if (!song)
    return res.status(404).send("The Song with the given ID was not found.");

  res.send(song);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const song = await Song.findByIdAndRemove(req.params.id);

  if (!song)
    return res.status(404).send("The Song with the given ID was not found.");

  res.send(song);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const song = await Song.findById(req.params.id).select("-__v");

  if (!song)
    return res.status(404).send("The Song with the given ID was not found.");

  res.send(song);
});

router.get("/byartist/:name", async (req, res) => {
  const songs = await Song.find({ artist: req.params.name }).sort({
    popularity: -1,
  });

  if (!songs)
    return res.status(404).send("The Song with the given ID was not found.");

  res.send(songs);
});

router.get("/byalbum/:name", async (req, res) => {
  const songs = await Song.find({ album: req.params.name }).sort({
    popularity: -1,
  });

  if (!songs)
    return res.status(404).send("The Song with the given ID was not found.");

  res.send(songs);
});

router.get("/search/:name", async (req, res) => {
  const songs = await Song.find({
    name: { $regex: req.params.name, $options: "i" },
  }).sort({ popularity: -1 });

  if (!songs)
    return res.status(404).send("The Song with the given ID was not found.");

  res.send(songs);
});

router.get("/get/artists", async (req, res) => {
  const artists = await Song.distinct("artist");

  if (!artists)
    return res.status(404).send("The artist with the given ID was not found.");

  res.send(artists);
});
router.get("/get/albums", async (req, res) => {
  const albums = await Song.distinct("album");

  if (!albums)
    return res.status(404).send("The album with the given ID was not found.");

  res.send(albums);
});

module.exports = router;
