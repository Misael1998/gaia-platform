const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const {
  sectors,
  supplies,
  individualProduct,
  products,
  providers,
  getProvider,
  sartype,
  inventory,
  employees,
  refferals,
  getRequestType,
  getDeliveryType,
  jobTitles,
  departments,
  paymentMethod,
  requestHistory
} = require("../controllers/data");

router.route("/supplies").get(auth, supplies);
router.route("/sectors").get(sectors);
router.route("/providers").get(auth, providers);
router.route("/providers/:id").get(auth, getProvider);
router.route("/sartype").get(sartype);
router.route("/inventory").get(inventory);
//router.route("/products").get(products);
router.route("/employees").get(employees);
router.route("/products/:id").get(individualProduct);
router.route("/refferals").get(auth, refferals);
router.route("/request").get(auth, getRequestType);
router.route("/delivery").get(auth, getDeliveryType);
router.route("/jobtitles").get(auth, jobTitles);
router.route("/departments").get(auth, departments);
router.route("/payment-method").get(paymentMethod);
router
  .route("/products")
  .get(auth, authorize("individual", "enterprise"), products);
router
  .route("/requesthistory")
  .get(auth, authorize("individual", "enterprise"), requestHistory);

module.exports = router;
