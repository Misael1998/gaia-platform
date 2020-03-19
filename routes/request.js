const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const { request, requestDetails } = require("../controllers/request");

router.route("/").post(
  [
    [
      check("emissionDate", "submit a valid date").matches(
        /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/
      ),
      check("shipping", "submit shipping").isNumeric(),
      check("requestType", "submit a request type").isNumeric(),
      check("deliveryType", "submit a delivery type").isNumeric(),
      check("payment", "submit payment type").isNumeric(),
      check("products", "submit an array of products")
        .isArray()
        .not()
        .isEmpty()
    ],
    auth,
    authorize("enterprise", "individual")
  ],
  request
);

router
  .route("/:id/details")
  .get(auth, authorize("individual", "enterprise"), requestDetails);

module.exports = router;
