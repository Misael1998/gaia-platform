const express = require("express");
const router = express.Router();

const { sectors } = require("../controllers/data");

router.route("/sectors").get(sectors);

module.exports = router;
