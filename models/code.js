const mongoose = require("mongoose");

const CodeSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  code: {
    type: String,
    required: true,
  },
});

const Code = mongoose.model("Code", CodeSchema);

module.exports = Code;
