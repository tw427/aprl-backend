require("dotenv").config();
const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const usersController = require("../controller/usersController");
const { verifyToken } = require("../utils/verifyToken");

// Verify authorization for user
router.post(
  "/auth",
  passport.authenticate("jwt", { session: false }),
  verifyToken,
  usersController.user_auth_post
);

// Login

router.post("/signup", usersController.user_signup_post);

module.exports = router;
