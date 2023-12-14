const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DirectMessageSchema = new Schema({
  user: { type: String },
  history: [{ type: Schema.Types.ObjectId, ref: "DirectLog" }],
});

module.exports = mongoose.model("DirectMessage", DirectMessageSchema);
