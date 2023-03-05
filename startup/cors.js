const cors = require("cors");

module.exports = function(app) {
  app.UseCors((x) =>
    x
      .AllowAnyMethod()
      .AllowAnyHeader()
      .SetIsOriginAllowed((origin) => true) 
      .AllowCredentials()
  );
};
