const express = require("express");
const router = express.Router();

const { sectors, sar_type } = require("../controllers/data");

router.route("/sectors").get(sectors);
router.route("/sar_type").get(sar_type);

module.exports = router;
