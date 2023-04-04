const Joi = require("joi");
const mongoose = require("mongoose");

//QID,title,titleSlug,difficulty,acceptanceRate,isPaidOnly,topicTags,categorySlug
// 1,Two Sum,two-sum,Easy,49.6805152168369,False,"array,hash-table",algorithms

const Question = mongoose.model(
  "Questions",
  new mongoose.Schema({
    qid: {
      type: Number,
      required: true,
      min: 0,
      max: 100000,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 255,
    },
    titleSlug: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 255,
    },
    categorySlug: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 255,
    },
    difficulty: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 255,
    },
    acceptanceRate: {
      type: Number,
      required: true,
      minlength: 0,
      maxlength: 100,
    },
    isPaidOnly: {
      type: Boolean,
      required: true,
      default: false,
    },
    topicTags: {
      type: Array,
      default: [],
    },
    companyTags: {
      type: Array,
      default: [],
    },
  })
);

function validateQuestion(Question) {
  const schema = {
    qid: Joi.number().min(0).max(100000).required(),
    title: Joi.string().min(3).max(255).required(),
    titleSlug: Joi.string().min(3).max(255).required(),
    categorySlug: Joi.string().min(3).max(255).required(),
    difficulty: Joi.string().min(3).max(255).required(),
    acceptanceRate: Joi.number().min(0).max(100),
    isPaidOnly: Joi.boolean(),
    topicTags: Joi.array(),
    companyTags: Joi.array(),
  };

  return Joi.validate(Question, schema);
}

exports.Question = Question;
exports.validate = validateQuestion;
