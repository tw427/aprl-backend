require("dotenv").config();
const express = require("express");
const router = express.Router();
const messageController = require("../controller/messageController");
// const passport = require("passport");

// Post a message
router.post(
  "/create-message/:id/:month/:day/:year/:time",
  messageController.message_post
);

// Delete a message
router.post("/delete/:id", messageController.message_delete);

module.exports = router;
