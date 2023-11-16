require("dotenv").config();
const express = require("express");
const router = express.Router();
const groupController = require("../controller/groupController");

router.post("/create", groupController.group_create);

router.get("/list", groupController.group_list);

module.exports = router;
