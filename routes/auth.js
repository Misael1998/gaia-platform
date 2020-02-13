const express = require("express");
const router = express.Router();

const { login, forgotPassword, resetPassword } = require("../controllers/auth");

router.route("/login").get(login);
router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword/:token").put(resetPassword);

module.exports = router;
