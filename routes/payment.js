const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const { pay, sucess, cancel } = require("../controllers/payment");

router.route("/pay").post(auth, authorize("individual", "enterprise"), pay);
router.route("/sucess").post(sucess);
router.route("/cancel").post(cancel);

module.exports = router;
