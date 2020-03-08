const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const { request } = require("../controllers/request");

router.route("/").post(request);

module.exports = router;
