const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DirectMessageSchema = new Schema({
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  history: [{ type: Schema.Types.ObjectId, ref: "Message" }],
});

module.exports = mongoose.model("DirectMessage", DirectMessageSchema);
