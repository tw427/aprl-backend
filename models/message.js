const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  // Does group need to be just a string? Or just the group id ?
  // group : {type: Schema.Types.ObjectId, ref: "Group", required: true},
  // time : {}
});

module.exports = mongoose.model("Message", MessageSchema);
