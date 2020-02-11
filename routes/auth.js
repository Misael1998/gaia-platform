const express = require("express");
const router = express.Router();

const { login } = require("../controllers/auth");

router.route("/login").get(login);

module.exports = router;
