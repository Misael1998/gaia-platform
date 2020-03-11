const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const { register } = require("../controllers/employees");

router.route("/").post(
  [
    [
      check("empName", "submit at least 2 charaters for Name").isLength({
        min: 2
      }),
      check("empLast").exists(),
      check("address", "submit at least 2 charaters for address").isLength({
        min: 2
      }),
      check("phone", "submit a valid phone number").isNumeric(),
      check("email", "submit a valid email").isEmail(),
      check("jobTitle", "id must be numeric").isNumeric(),
      check("department", "id must be numeric").isNumeric(),
      check("admissionDate", "submit a valid date").matches(
        /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/
      ),
      check("password", "passsword must me at least 8 characters").isLength({
        min: 8
      })
    ],
    auth,
    authorize("admin")
  ],
  register
);

module.exports = router;
