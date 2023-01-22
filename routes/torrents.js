const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const snow = require("snowfl-scrapper");

router.get("/day/", async (req, res) => {
  const day = snow.day();
  try {
    day.then((torrents) => {
      res.send(torrents);
    });
  } catch (ex) {
    console.log(ex);
    res.send("Something Went Wrong");
  }
});
router.get("/week/", async (req, res) => {
  const week = snow.week();
  try {
    week.then((torrents) => {
      res.send(torrents);
    });
  } catch (ex) {
    console.log(ex);
    res.send("Something Went Wrong");
  }
});
router.get("/month/", async (req, res) => {
  const month = snow.month();
  try {
    month.then((torrents) => {
      res.send(torrents);
    });
  } catch (ex) {
    console.log(ex);
    res.send("Something Went Wrong");
  }
});
router.get("/search/:id", async (req, res) => {
  const search = snow.search(req.params.id);
  try {
    search.then((torrents) => {
      res.send(torrents);
    });
  } catch (ex) {
    console.log(ex);
    res.send("Something Went Wrong");
  }
});

module.exports = router;
