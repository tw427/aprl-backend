const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  name: { type: String, required: true },
  history: [{ type: Schema.Types.ObjectId, ref: "Message" }],
});

module.exports = mongoose.model("Group", GroupSchema);
