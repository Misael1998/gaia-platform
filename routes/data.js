const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const isLogged = require("../middleware/data");

const {
  sectors,
  supplies,
  individualProduct,
  products,
  providers,
  sar_type,
  inventory
} = require("../controllers/data");

router.route("/supplies").get(isLogged, supplies);
router.route("/sectors").get(sectors);
router.route("/providers").get(auth, providers);
router.route("/sar_type").get(sar_type);
router.route("/inventory").get(inventory);
router.route("/products").get(products);
router.route("/products/:id").get(individualProduct);

module.exports = router;
