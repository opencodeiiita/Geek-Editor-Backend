const mongoose = require("mongoose");

const CodeSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  languageCode: {
    type: String,
    required: true,
  },

}, { timestamps: true });

const Code = mongoose.model("Code", CodeSchema);

module.exports = Code;
