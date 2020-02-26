const express = require("express");
const router = express.Router();

const { sectors,supplies } = require("../controllers/data");


router.route("/supplies").get(supplies);
router.route("/sectors").get(sectors);

module.exports = router;
