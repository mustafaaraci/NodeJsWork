const mongoose = require("mongoose");
const { type } = require("os");

const authShema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  mail: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Auth", authShema);
