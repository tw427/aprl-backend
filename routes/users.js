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

// Missing a signup route, but we can most likely just link directly to our usersController method

module.exports = router;
