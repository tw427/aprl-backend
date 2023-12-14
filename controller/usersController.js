require("dotenv").config();
const User = require("../models/user");
const Message = require("../models/message");
const DirectMessage = require("../models/directMessage");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.user_list_get = asyncHandler(async (req, res, next) => {
  const userList = await User.find({})
    .populate("username")
    .sort({ username: 1 })
    .exec();

  res.json(userList);
});

exports.user_signup_post = [
  body("username", "Username minimum of 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("password", "Password minimum of 6 characters")
    .trim()
    .isLength({ min: 6 }),
  body("confirmPassword", "Passwords must match!").trim().isLength({ min: 6 }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({ error: errors.array() });
    }

    // Check if user exists prior
    const userExist = await User.findOne({
      username: req.body.username,
    }).exec();

    if (userExist) {
      return res.status(400).json({
        message: "Username already exists.",
      });
    }
    // Password equality check
    if (req.body.password !== req.body.confirmPassword) {
      return res.status(401).json({
        message: "Passwords must match!",
      });
    }

    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) return next(err);

      const directMessage = new DirectMessage({
        user: req.body.username,
        history: [],
      });

      await directMessage.save();

      const user = new User({
        username: req.body.username,
        password: hashedPassword,
        directMessages: directMessage._id,
      });

      await user.save();

      jwt.sign(
        { user: user },
        process.env.REFRESH_KEY,
        { expiresIn: "10m" },
        (err, token) => {
          if (err) return next(err);

          return res.status(200).json({
            token,
            user: {
              username: user.username,
            },
            message: "Success! Account created.",
          });
        }
      );
    });
  }),
];

exports.user_auth_post = asyncHandler(async (req, res, next) => {
  jwt.verify(req.token, process.env.REFRESH_KEY, (err, authData) => {
    if (err) {
      res.status(403).json({
        message: "Authorizaton is invalid or has expired!",
      });
    } else {
      console.log(req.user);
      return res.status(200).json({
        message: "Authorzation valid",
        authData,
      });
    }
  });
});

exports.user_message_get = asyncHandler(async (req, res, next) => {
  const userMessage = await Message.find({ author: req.params.id })
    .populate("author", ["username", "_id"])
    .exec();

  res.json(userMessage);
});
