const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  sectors,
  supplies,
  individualProduct,
  products,
  providers,
  getProvider,
  sar_type,
  inventory,
  employees
} = require("../controllers/data");

router.route("/supplies").get(auth, supplies);
router.route("/sectors").get(sectors);
router.route("/providers").get(auth, providers);
router.route("/providers/:id").get(auth, getProvider);
router.route("/sar_type").get(sar_type);
router.route("/inventory").get(inventory);
router.route("/products").get(products);
router.route("/employees").get(employees);
router.route("/products/:id").get(individualProduct);

module.exports = router;
