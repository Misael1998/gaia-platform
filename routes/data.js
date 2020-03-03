const express = require("express");
const router = express.Router();

const { sectors, products, individualProduct, employees, sar_type, inventory, supplies } = require("../controllers/data");

const isLogged = require('../middleware/data');

router.route("/supplies").get(isLogged, supplies);
router.route("/sectors").get(sectors);
router.route("/sar_type").get(sar_type);
router.route("/inventory").get(inventory);
router.route("/products").get(products);
router.route("/employees").get(employees);
router.route("/products/:id").get(individualProduct);

module.exports = router;