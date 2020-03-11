const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const { register } = require("../controllers/employees");

router.route("/").post(auth, authorize("admin"), register);

module.exports = router;
