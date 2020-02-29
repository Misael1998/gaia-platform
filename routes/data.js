const express = require("express");
const router = express.Router();



const isLogged = require('../middleware/data');

const { sectors,supplies } = require("../controllers/data");

router.route("/supplies").get(isLogged,supplies);
router.route("/sectors").get(sectors);

module.exports = router;
