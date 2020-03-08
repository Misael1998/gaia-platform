const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const { request } = require("../controllers/request");

router.route("/").post([auth, authorize("enterprise", "individual")], request);

module.exports = router;
