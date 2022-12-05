const express = require("express");
const router = express.Router();
const request = require("request");
const https = require("https");
const http = require("http");
const fs = require("fs");

function download(url) {
  const file = fs.createWriteStream("/temp/temp.mp3");
  const request = https.get(url, function (response) {
    response.pipe(file);

    // after download completed close filestream
    file.on("finish", () => {
      file.close();
      console.log("Download Completed");
    });
  });
}

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
        download(mp3Url);
        fs.readFile("/temp.mp3", function (err, result) {
          res.send(
            "data:audio/mpeg" +
              ";base64,".base64_encode(file_get_contents($file))
          );
          res.send(result.toString("base64"));
        });
        // const obj = { url: mp3Url };
        // res.send(obj);
      } else {
        res.status(404);
        res.send("error occured");
      }
    }
  );
});

module.exports = router;
