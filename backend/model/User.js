let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({});

module.exports = mongoose.model("User", userSchema);
