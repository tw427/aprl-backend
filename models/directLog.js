const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DirectLog = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  recipient: { type: Schema.Types.ObjectId, ref: "User" },
  log: [{ type: Schema.Types.ObjectId, ref: "Message" }],
});

module.exports = mongoose.model("DirectMessage", DirectMessageSchema);
