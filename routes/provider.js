const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const { newProvider } = require("../controllers/provider");

router.route("/").post(
    [
        [
            check("name", "submit at least 2 characters for Name").isLength({
                min: 2
            }),
            check("phone", "submit a valid phone number").isNumeric(),
            check("email", "submit a valid email").isEmail(),
        ],
        auth,
        authorize("admin")
    ],
    newProvider
);

module.exports = router;