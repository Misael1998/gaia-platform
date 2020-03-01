const express = require("express");
const router = express.Router();



const { sectors, products, individualProduct, employees } = require("../controllers/data");


router.route("/sectors").get(sectors);
router.route("/products").get(products);
router.route("/employees").get(employees);
router.route("/products/:id").get(individualProduct);

module.exports = router;