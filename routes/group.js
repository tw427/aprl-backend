require("dotenv").config();
const express = require("express");
const router = express.Router();
const groupController = require("../controller/groupController");

router.post("/create", groupController.group_create);

router.get("/:id/message/history", groupController.group_get_history);

router.get("/list", groupController.group_list);

module.exports = router;
