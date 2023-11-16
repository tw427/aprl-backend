require("dotenv").config();
// const User = require("../models/user");
// const Message = require("../models/message");
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
  const groupList = await Group.find({}).populate("history").exec();

  res.json(groupList);
});
