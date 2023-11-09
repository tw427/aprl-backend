const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  // group : {type: Schema.Types.ObjectId, ref: "Group", required: true},
  date: { type: String, required: true },
  time: { type: String, required: true },
});

module.exports = mongoose.model("Message", MessageSchema);
