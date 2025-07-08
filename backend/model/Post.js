let mongoose = require("mongoose");

let postSchema = new mongoose.Schema({});

module.exports = mongoose.model("Post", postSchema);
