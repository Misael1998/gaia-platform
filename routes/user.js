const express = require("express");
const router = express.Router();

const { registerIndividualClient } = require("../controllers/user");

router.route("/registerindivualclient").post(registerIndividualClient);

module.exports = router;
