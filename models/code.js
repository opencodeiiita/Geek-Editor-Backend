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
});

const Code = mongoose.model("Code", CodeSchema);

module.exports = User;
