const express = require("express");
const router = express.Router();

const { authUser } = require("../controllers/auth");

router.route("/").get(authUser);

module.exports = router;
