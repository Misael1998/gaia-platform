const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const { sendBill } = require("../controllers/bill");

router.route("/").post(auth, authorize("individual", "enterprise"), sendBill);

module.exports = router;
