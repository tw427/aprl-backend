const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  directMessages: { type: Schema.Types.ObjectId, ref: "DirectMessage" },
});

module.exports = mongoose.model("User", UserSchema);
