const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const { login, forgotPassword, resetPassword } = require("../controllers/auth");

router
  .route("/login")
  .post(
    [
      check("email", "please enter a valid email").isEmail(),
      check(
        "password",
        "please enter a password of 8 character minimun"
      ).isLength({ min: 8 })
    ],
    login
  );

router
  .route("/forgotpassword")
  .post(
    [check("email", "please enter a valid email").isEmail()],
    forgotPassword
  );

router
  .route("/resetpassword/:token")
  .put(
    [
      check(
        "password",
        "please enter a password of 8 character minimun"
      ).isLength({ min: 8 })
    ],
    resetPassword
  );

module.exports = router;
