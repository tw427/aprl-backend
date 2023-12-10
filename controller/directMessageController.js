require("dotenv").config();
const User = require("../models/user");
// const Message = require("../models/message");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// Create a whole new type of messages: Direct Messages
// These will be separated from our regular chatroom messages

// Direct Messages follow a
// {users: [], history: []}
// When we create a Direct Message it will become a direct link between
// our two users, and any additional new connections from our Base user
// will have an additional object added to both users and history

// For example if there are messsages between Bug and Katie | Bug and Tony
// {
//     users: [
//         {names: ["Bug", "Katie"]},
//         {names: ["Bug", "Tony"]}
//     ],
//     history: [
//         {names: ["Bug", "Katie"], messages: [{}, {}, {}]},
//         {names: ["Bug", "Tony"], messages: [{}, {}, {}]}
//     ]
// }
// In this way we can first sort through our recipents users array
// to see if there is an already existing conversation
// depending on if that is true we can pull the history instead of
// creating new objects, if false we will create new objects and start
// a new record / history of the new conversation.
