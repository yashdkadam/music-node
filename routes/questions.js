const { Question, validate } = require("../models/question");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const Questions = await Question.find().select("-__v").sort("name");
  res.send(Questions);
});

router.post("/", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const question = new Question({
    qid: req.body.qid,
    title: req.body.title,
    titleSlug: req.body.titleSlug,
    categorySlug: req.body.categorySlug,
    acceptanceRate: req.body.acceptanceRate,
    difficulty: req.body.difficulty,
    isPaidOnly: req.body.isPaidOnly,
    topicTags: req.body.topicTags,
    companyTags: req.body.companyTags,
  });
  await question.save();

  res.send(question);
});

router.put("/:id", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const question = await Question.findByIdAndUpdate(
    req.params.id,
    {
      qid: req.body.qid,
      title: req.body.title,
      titleSlug: req.body.titleSlug,
      categorySlug: req.body.categorySlug,
      acceptanceRate: req.body.acceptanceRate,
      difficulty: req.body.difficulty,
      isPaidOnly: req.body.isPaidOnly,
      topicTags: req.body.topicTags,
      companyTags: req.body.companyTags,
    },
    { new: true }
  );

  if (!question)
    return res.status(404).send("The Question with the given ID was not found.");

  res.send(question);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const question = await Question.findByIdAndRemove(req.params.id);

  if (!question)
    return res.status(404).send("The Question with the given ID was not found.");

  res.send(question);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const question = await Question.findById(req.params.id).select("-__v");

  if (!question)
    return res.status(404).send("The Question with the given ID was not found.");

  res.send(question);
});

module.exports = router;
