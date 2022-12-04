const http = require("axios");

async function temp() {
  let res = await http.get(
    "https://apiyoutube.cc/check.php?callback=jQuery34108672477917974195_1666787018121&v=2hcazNu2xjk"
  );
  console.log(res);
}
temp();
