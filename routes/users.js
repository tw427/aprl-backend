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

router.post("/login", function (req, res, next) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    console.log(user);
    if (err || !user) {
      return res.status(400).json({
        message: "User does not exist or user information was incorrect",
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }

      const token = jwt.sign(user.toJSON(), process.env.REFRESH_KEY, {
        expiresIn: "60m",
      });
      return res.json({ user, token });
    });
  })(req, res);
});

router.post("/signup", usersController.user_signup_post);

module.exports = router;
