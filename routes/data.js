const express = require("express");
const router = express.Router();

const auth = require('../middleware/data');

const {
  sar_type,
  inventory,
  sectors,
  supplies,
  individualProduct,
  products
} = require("../controllers/data");

router.route("/supplies").get(auth, supplies);
router.route("/sectors").get(sectors);
router.route("/sar-type").get(sar_type);
router.route("/inventory").get(inventory);
router.route("/products").get(products);
router.route("/employees").get(employees);
router.route("/products/:id").get(individualProduct);

module.exports = router;