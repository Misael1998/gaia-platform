const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const { request } = require("../controllers/request");

router
  .route("/")
  .post(
    [
      [
        check("emissionDate", "submit a valid date").matches(
          /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
        ),
        check("shipping", "submit shipping").exists(),
        check("requestType", "submit a request type").exists(),
        check("deliveryType", "submit a delivery type").exists(),
        check("products", "submit an array of products").isArray()
      ],
      auth,
      authorize("enterprise", "individual")
    ],
    request
  );

module.exports = router;
