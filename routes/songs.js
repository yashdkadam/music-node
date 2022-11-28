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
  await song.save();

  res.send(song);
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

module.exports = router;
