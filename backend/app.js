let express = require("express");
let app = express();

if(process.env.NODE_ENV !== "PRODUCTION"){
  require("dotenv").config({path:"backend/config/config.env"})
}

module.exports = app;
