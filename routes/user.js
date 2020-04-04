const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const {
  registerEnterpriseUser,
  registerIndividualClient,
  updateUser
} = require("../controllers/user");

router
  .route("/registerenterpriseuser")
  .post(
    [
      check("email").isEmail(),
      check("password").isLength({ min: 8 }),
      check("phone").exists(),
      check("address").exists(),
      check("company_name").exists(),
      check("company_type").exists(),
      check("rtn").isLength(14),
      check("contact_name").exists(),
      check("contact_number").exists(),
      check("sector").exists(),
      check("business_name").exists()
    ],
    registerEnterpriseUser
  );

router
  .route("/registerindividualclient")
  .post(
    [
      check("email").isEmail(),
      check("password").isLength({ min: 8 }),
      check("phone").exists(),
      check("address").exists(),
      check("name").exists(),
      check("lastName").exists(),
      check("birth_date").exists(),
      check("register_id").isLength(13)
    ],
    registerIndividualClient
  );

  router.route("/updateuser").put(auth,authorize("enterprise","individual") ,updateUser);
  
module.exports = router;
