const express = require("express");
const router = express.Router();

const { login, forgotPassword } = require("../controllers/auth");

router.route("/login").get(login);
router.route("/forgotpassword").post(forgotPassword);

module.exports = router;
