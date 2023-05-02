const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");

app.use(helmet());
app.use(cors());
app.use(express.json());
dotenv.config({ path: "./.env" });
require("./src/db/connection");

app.use("/api/v1/users", require("./src/apis/router/auth/auth.route"));

const server = app.listen(8080, () => {
  var host = "localhost";
  var port = server.address().port;
  console.log("App listening at http://%s:%s", host, port);
});
