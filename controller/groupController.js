require("dotenv").config();
// const User = require("../models/user");
const Message = require("../models/message");
const Group = require("../models/group");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.group_create = [
  body("groupname", "Group name must be at least 3 characters long")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const group = new Group({
      name: req.body.groupname,
    });

    if (!errors.isEmpty()) {
      return res.json({ error: errors.array() });
    }

    await group.save();
    res.status(200).json({ group: group });
  }),
];

exports.group_list = asyncHandler(async (req, res, next) => {
  const groupList = await Group.find({}).exec();

  res.json(groupList);
});

exports.group_get_history = asyncHandler(async (req, res, next) => {
  const group = await Group.findById(req.params.id)
    .populate("history")
    .populate({ path: "history", populate: { path: "author" } })
    .exec();

  console.log(group);
  res.json(group.history);
});
