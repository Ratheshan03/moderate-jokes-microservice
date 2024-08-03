const mongoose = require("mongoose");

const jokeSchema = new mongoose.Schema({
  content: String,
  type: String,
  is_moderated: Boolean,
});

const Joke = mongoose.model("Joke", jokeSchema);

module.exports = Joke;
