const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const { newProduct, productsAdmin } = require("../controllers/product");

router.route("/").post(
    [
        [
            check("name", "Submit name").exists(),
            check("idCategory", "Submit category").exists(),
            check("idSarType", "Submit sar type").exists(),
            check("prices", "Submit array of prices")
            .isArray()
            .not()
            .isEmpty()
        ], auth, authorize("admin")
    ],
    newProduct
);

router.route("/products-admin").get(auth, authorize("admin"), productsAdmin);

module.exports = router;