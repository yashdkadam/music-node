const express = require("express");
const router = express.Router();
const request = require("request");
const https = require("https");
const http = require("http");
const fs = require("fs");

router.get("/:id", async (req, res) => {
  request(
    "https://apiyoutube.cc/check.php?callback=jQuery34108672477917974195_1666787018121&v=" +
      req.params.id,
    function (error, response, body) {
      if (!error && response.statusCode === 200) {
        body = body.substring(body.indexOf("(") + 1);
        body = body.substring(0, body.length - 1);
        const response = JSON.parse(body);
        mp3Url =
          "https://apiyoutube.cc/m4a/" +
          response["hash"] +
          "::" +
          response["user"];
        const obj = { url: mp3Url };
        res.send(obj);
      }
    }
  );
});

module.exports = router;
