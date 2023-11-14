require("dotenv").config();
// const User = require("../models/user");
const Message = require("../models/message");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.message_post = [
  body("message", "Message must include at least 1 character")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const newDate = `${req.params.month}/${req.params.day}/${req.params.year}`;

    const message = new Message({
      author: req.params.id,
      message: req.body.message,
      date: newDate,
      time: req.params.time,
    });

    if (!errors.isEmpty()) {
      return res.json({ error: errors.array() });
    }

    await message.save();
    res.status(200).json({ message: message });
  }),
];

exports.message_delete = asyncHandler(async (req, res, next) => {
  await Message.findByIdAndDelete(req.params.id);
  return res.status(200).json({ message: `Message ${req.params.id} removed!` });
});
