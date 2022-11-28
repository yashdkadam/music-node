const Joi = require("joi");
const mongoose = require("mongoose");

const Song = mongoose.model(
  "Songs",
  new mongoose.Schema({
    url: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 255,
    },
    sid: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 255,
    },
    artist: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 255,
    },
    imgUrl: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 2550,
    },
    previewUrl: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 2550,
    },
    album: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 2550,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 2550,
    },
    popularity: {
      type: Number,
      required: true,
      trim: true,
      minlength: 0,
      maxlength: 1000,
    },
  })
);

function validateSong(song) {
  const schema = {
    url: Joi.string().min(3).max(255).required(),
    sid: Joi.string().min(3).max(255).required(),
    name: Joi.string().min(3).max(255).required(),
    artist: Joi.string().min(3).max(255).required(),
    album: Joi.string().min(3).max(255).required(),
    imgUrl: Joi.string().min(3).max(2550).required(),
    previewUrl: Joi.string().min(3).max(2550).required(),
    popularity: Joi.number().min(0).max(1000).required(),
  };

  return Joi.validate(song, schema);
}

exports.Song = Song;
exports.validate = validateSong;
