require("dotenv").config();
const User = require("../models/user");
// const Message = require("../models/message");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// Create a whole new type of messages: Direct Messages
// These will be separated from our regular chatroom messages

// Direct Messages follow a
// { user: "name", history:
//   [
//     {
//     sender: "name",
//     recipient: "name",
//     log: [Message, Message, Message],
//     }
//   ]}

// Each time a new DirectMessage is formed between two users
// we will store the chat history logs within the sender's collection

// Now when we check for a log we will use the conditionals in this way:
// Scan for a history object for who the sender is in this case
// Once we have identified the sender we will be presented with 2 choices
// If current user is not sender, we query the sender's collection for logs
// If current user is sender, get logs.
