const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DirectLog = new Schema({
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  log: [{ type: Schema.Types.ObjectId, ref: "Message" }],
});

// So any time we start a fresh new DM, we will create a DirectLog schema
// Both users will be pushed into the users array with their usernames
// DirectLog object will be pushed into both users history array in
// their directMessages property.

// Any time either user wants to DM one another the web app will query
// the correct DirectLog to pull up within the initiating user's
// directMessages history array

// The query will attempt to match our recipients name with our
// initiators name to be in the users array

// Once a match has been found we pull logs to display in view.
// on the Frontend we can have a currentDM state that will set
// itself to the new DirectLog for POST requests to update message logs.

module.exports = mongoose.model("DirectMessage", DirectMessageSchema);
