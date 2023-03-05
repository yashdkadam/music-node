const cors = require("cors");

var corsOptions = {
  origin: "https://movie-web-app-2002.web.app/",
};


module.exports = function(app) {
  app.use(cors(corsOptions));
  // app.use(cors());
};
