const mongoose = require("mongoose");

const searchSchema = new mongoose.Schema({
  num: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: "Number must be an integer",
    },
  },
  timestamp: { type: Date, default: Date.now },
});

const Search = mongoose.model("Search", searchSchema);

module.exports = Search;
