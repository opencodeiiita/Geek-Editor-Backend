const mongoose = require("mongoose");

const CodeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
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
  }

}, { timestamps: true });

const Code = mongoose.model("Code", CodeSchema);

module.exports = Code;
