const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { sectors, providers } = require("../controllers/data");

router.route("/sectors").get(sectors);
router.route("/providers").get(auth, providers);

module.exports = router;
