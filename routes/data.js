const express = require("express");
const router = express.Router();

const { sectors, inventory } = require("../controllers/data");


router.route("/sectors").get(sectors);
router.route("/inventory").get(inventory);

module.exports = router;
