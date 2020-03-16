const express = require("express");
const router = express.Router();
const auth = require("../middleware/data");
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
  getDeliveryType
} = require("../controllers/data");

router.route("/supplies").get(auth, supplies);
router.route("/sectors").get(sectors);
router.route("/providers").get(auth, providers);
router.route("/providers/:id").get(auth, getProvider);
router.route("/sartype").get(sartype);
router.route("/inventory").get(inventory);
router.route("/products").get(products);
router.route("/employees").get(employees);
router.route("/products/:id").get(individualProduct);
router.route("/refferals").get(auth,refferals);
router.route("/request").get(auth, getRequestType);
router.route("/delivery").get(auth, getDeliveryType);

module.exports = router;
