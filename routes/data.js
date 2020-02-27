const express = require("express");
const router = express.Router();
const logger = require('../middleware/logger');

const { sectors,supplies } = require("../controllers/data");

router.route("/supplies").get(logger,supplies);
router.route("/sectors").get(sectors);

module.exports = router;
