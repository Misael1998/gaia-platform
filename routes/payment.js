const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const { pay, success, cancel } = require("../controllers/payment");

router
  .route("/pay")
  .post(
    check("request", "request id required").isNumeric(),
    auth,
    authorize("individual", "enterprise"),
    pay
  );
router.route("/success").get(success);
router.route("/cancel").get(cancel);

module.exports = router;
